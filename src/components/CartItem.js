import React from "react";
import { useDispatch } from "../hooks/useDispatch";
import { useStore } from "../hooks/useStore";
import { formatCurrency } from "../utils/formatCurrency";

function CartItem({ title, quantity, variant, id }) {
  const { client, checkout } = useStore();
  const dispatch = useDispatch();

  const handleRemoveItem = (e) => {
    e.preventDefault();

    async function removeItem() {
      const updatedCheckout = await client.checkout.removeLineItems(
        checkout.id,
        id
      );

      dispatch({ type: "UPDATE_CHECKOUT", payload: updatedCheckout });
    }

    removeItem();
  };

  return (
    <div
      style={{
        border: "2px solid black",
        padding: "2em",
        margin: "0 0 2em",
      }}
    >
      <p>
        <strong>{title}</strong>
        <br />
        <em>{variant.title}</em>
      </p>
      <p>{quantity}</p>
      <p>{formatCurrency(variant.priceV2)}</p>
      <button onClick={handleRemoveItem}>Remove item</button>
    </div>
  );
}

export default CartItem;
