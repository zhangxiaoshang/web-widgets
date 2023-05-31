import { createContext, useContext } from "react";

export const FullsizeContext = createContext(false);

export const useIsFullsize = () => useContext(FullsizeContext);
