import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "../hooks/useDispatch";
import { useStore } from "../hooks/useStore";
import Layout from "./Layout";

const INITIAL_FIELDS = {
  variant: "",
  quantity: 1,
};

function Product() {
  const { products, client, checkout } = useStore();
  const dispatch = useDispatch();
  // the product handle (slug) is provided in the URL
  // we can use this to filter out our list of products and retrieve the current product
  const { handle } = useParams();

  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [isAdding, setAdding] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // products have been queried for earlier during app rendering
    // to prevent additional HTTP requests, we can simply filter out all products that do not match the given URL handle
    const product = products
      .filter((product) => product.handle === handle)
      .pop();

    if (product && product.variants[0].title === "Default Title") {
      setFields((prevState) => {
        return {
          ...prevState,
          variant: product.variants[0].id,
        };
      });
    }

    setProduct(product);
  }, [handle, products]);

  const handleFieldChange = (e) => {
    setFields((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!fields.variant.length) {
      return;
    }

    // Toggle a flag so that we can disable the form submit button (i.e. we want to prevent accidential "add to carts")
    setAdding(true);

    // shopify will throw an error if you don't coerce the quantity into a Number
    const payload = await client.checkout.addLineItems(checkout.id, [
      { variantId: fields.variant, quantity: Number(fields.quantity) },
    ]);

    dispatch({ type: "UPDATE_CHECKOUT", payload });

    // toggle submit button back to default state
    setAdding(false);
  };

  // prevent component rendering until all properties of current product have been assigned
  if (!product) {
    return null;
  }

  const { title, description, id, variants } = product;

  const variantsToDisplay = variants.filter(
    (variant) => variant.title !== "Default Title"
  );

  return (
    <Layout>
      <h1>Product page</h1>
      <h2>{title}</h2>
      <h3>Description</h3>
      <p>{description}</p>
      <form method="POST" onSubmit={handleAddToCart}>
        {variantsToDisplay.map((variant) => {
          return (
            <div key={variant.id}>
              <label htmlFor={`variant-${variant.id}`}>{variant.title}</label>
              <input
                id={`variant-${variant.id}`}
                type="radio"
                name="variant"
                value={variant.id}
                onChange={handleFieldChange}
              />
            </div>
          );
        })}
        <label htmlFor={`item-${id}`}>Quantity</label>
        <input
          id={`item-${id}`}
          type="number"
          min="0"
          max="5"
          name="quantity"
          value={fields.quantity}
          step="1"
          onChange={handleFieldChange}
        />
        <button type="submit" disabled={isAdding}>
          Add to cart
        </button>
      </form>
    </Layout>
  );
}

export default Product;
