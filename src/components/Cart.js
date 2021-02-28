import React from "react";
import { useDispatch } from "../hooks/useDispatch";
import { useStore } from "../hooks/useStore";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";
import Layout from "./Layout";

function Cart() {
  const { client, checkout } = useStore();
  const dispatch = useDispatch();

  const handleEmptyCart = (e) => {
    e.preventDefault();
    async function empty() {
      const ids = checkout.lineItems.map((li) => li.id);
      const updatedCheckout = await client.checkout.removeLineItems(
        checkout.id,
        ids
      );

      dispatch({ type: "RESET_CHECKOUT", payload: updatedCheckout });
    }

    empty();
  };

  return (
    <Layout>
      <h1>Checkout page</h1>
      <p>You have {checkout.lineItems.length} in your cart!</p>
      <div>
        {checkout.lineItems.map((cartItem) => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
      </div>
      <h2>Subtotal</h2>
      <p>{formatCurrency(checkout.subtotalPriceV2)}</p>
      <h2>Taxes</h2>
      <p>{formatCurrency(checkout.totalTaxV2)}</p>
      <h2>Total</h2>
      <p>{formatCurrency(checkout.totalPriceV2)}</p>
      <button
        onClick={() => window.open(checkout.webUrl)}
        disabled={checkout.lineItems.length === 0}
      >
        Check out
      </button>
      <button onClick={handleEmptyCart}>Empty cart</button>
    </Layout>
  );
}

export default Cart;
