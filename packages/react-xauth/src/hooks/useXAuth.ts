import { useContext } from "react";
import { XAuthContext } from "../XAuthContext";

export const useXAuth = () => {
  const { state, ...rest } = useContext(XAuthContext);

  return [state, rest] as [typeof state, typeof rest];
};