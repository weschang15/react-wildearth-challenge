// Why am i using Context/Provider?
// I want to share some level of state across the entire application.
// I also want to separate how this application mutates state from the UI logic

import React, { createContext, useReducer } from "react";
import { INITIAL_STORE_STATE, storeReducer } from "../reducers/storeReducer";

// expose our global state stored in context
export const StoreContext = createContext({});
// expose our global dispatch reducer stored in context
export const StoreDispatch = createContext({});

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, INITIAL_STORE_STATE);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatch.Provider value={dispatch}>
        {children}
      </StoreDispatch.Provider>
    </StoreContext.Provider>
  );
}
