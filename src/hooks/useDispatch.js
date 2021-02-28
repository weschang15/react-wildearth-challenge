import { useContext } from "react";
import { StoreDispatch } from "../providers/StoreProvider";

export function useDispatch() {
  const context = useContext(StoreDispatch);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a StoreDispatch provider");
  }

  return context;
}
