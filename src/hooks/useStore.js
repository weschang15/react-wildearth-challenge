import { useContext } from "react";
import { StoreContext } from "../providers/StoreProvider";

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreContext provider");
  }

  return context;
}
