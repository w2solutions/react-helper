import { useContext } from "react";
import { EzAuthContext } from "../EzAuthContext";

export const useEzAuth = () => {
  const { state, ...rest } = useContext(EzAuthContext);

  return [state, rest] as [typeof state, typeof rest];
};