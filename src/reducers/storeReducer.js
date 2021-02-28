// Why am I using a reducer?
// I don't want the application UI logic to be tightly coupled to global state
// Reducers allow us to trigger actions which subsequently mutates global state

import ShopifyClient from "shopify-buy";

const client = ShopifyClient.buildClient({
  storefrontAccessToken: process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
  domain: process.env.REACT_APP_STOREFRONT_DOMAIN,
});

// we shouldn't have to create a new client every time we want to send off a query, let's add it to our global state
export const INITIAL_STORE_STATE = {
  client,
  checkout: {
    lineItems: [],
  },
  products: [],
};

export function storeReducer(state, action = {}) {
  switch (action.type) {
    case "UPDATE_CHECKOUT":
      // Ref: https://shopify.github.io/js-buy-sdk/#adding-line-items
      // Ref: https://shopify.github.io/js-buy-sdk/#updating-line-items
      return { ...state, checkout: { ...action.payload } };

    case "FETCH_PRODUCTS":
      // Ref: https://shopify.github.io/js-buy-sdk/#fetching-products
      return { ...state, products: [...action.payload] };

    case "RESET_CHECKOUT":
      localStorage.removeItem("checkoutId");
      return { ...state, checkout: { ...action.payload } };

    case "INITIALIZE_CHECKOUT":
      // Ref: https://shopify.github.io/js-buy-sdk/#creating-a-checkout
      localStorage.setItem("checkoutId", action.payload.id);
      return { ...state, checkout: { ...action.payload } };

    default:
      throw new Error(`Could not dispatch action ${action.type}`);
  }
}
