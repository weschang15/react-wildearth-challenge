import React from "react";
import { useDispatch } from "../hooks/useDispatch";
import { useStore } from "../hooks/useStore";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";
import Layout from "./Layout";
import PageHeader from "./PageHeader";

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
      <PageHeader pageTitle="Checkout page" />
      <section className="max-w-4xl mx-auto mt-5">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-base leading-6 text-black-400">
              You have {checkout.lineItems.length} in your cart!
            </h2>
            {checkout.lineItems.map((cartItem) => {
              return <CartItem key={cartItem.id} {...cartItem} />;
            })}
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Subtotal</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatCurrency(checkout.subtotalPriceV2)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Taxes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatCurrency(checkout.totalTaxV2)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatCurrency(checkout.totalPriceV2)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            <button
              onClick={handleEmptyCart}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Empty cart
            </button>
            <button
              onClick={() => window.open(checkout.webUrl)}
              disabled={checkout.lineItems.length === 0}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Check out
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Cart;
