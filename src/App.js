import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import { useDispatch } from "./hooks/useDispatch";
import { useStore } from "./hooks/useStore";

function App() {
  const { client, products } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    // we want to query for all products and trigger an action to store the product list into our global state
    async function getProducts() {
      const payload = await client.product.fetchAll();
      dispatch({ type: "FETCH_PRODUCTS", payload });
    }

    // we need to check to see if the user has previously added products to their cart
    // if they did, we need to retrieve the existing cart in order to provide the opportunity to checkout, otherwise, we can treat the user as a newbie
    async function initializeCheckout() {
      // to keep track of checkouts, we can store the checkout ID in local storage
      const existingCheckoutId = localStorage.getItem("checkoutId");

      if (existingCheckoutId) {
        const existingCheckout = await client.checkout.fetch(
          existingCheckoutId
        );

        dispatch({ type: "INITIALIZE_CHECKOUT", payload: existingCheckout });
        return;
      }

      // newbie user, create a fresh checkout
      const checkout = await client.checkout.create();
      dispatch({ type: "INITIALIZE_CHECKOUT", payload: checkout });
    }

    async function go() {
      await initializeCheckout();
      await getProducts();
    }

    go();
  }, [client.checkout, client.product, dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Products products={products} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
