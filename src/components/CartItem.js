import React from "react";
import { Link } from "react-router-dom";
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
    <div className="grid grid-cols-8 overflow-hidden gap-6 mt-5 mb-5">
      <div className="col-span-1">
        {variant.image && (
          <figure>
            <img
              className="object-cover rounded"
              src={variant.image.src}
              alt={variant.image.altText}
            />
          </figure>
        )}
      </div>
      <div className="col-span-7">
        <div className="flex">
          <h2 className="text-lg font-semibold text-gray-800 flex-grow m-0">
            <Link
              to={{
                pathname: `/products/${variant.product.handle}`,
              }}
            >
              {title}
            </Link>
          </h2>
          <button
            className="border border-gray bg-white hover:bg-gray-50 text-gray-700 font-medium py-1 px-3 rounded inline-flex items-center hover:bg-gray-50 focus:ring-blue-500"
            onClick={handleRemoveItem}
          >
            x
          </button>
        </div>
        <p>
          <em>{variant.title}</em>
        </p>
        <p>QTY {quantity}</p>
        <p className="text-gray-600">{formatCurrency(variant.priceV2)}</p>
      </div>
    </div>
  );
}

export default CartItem;
