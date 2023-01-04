import React, {
  createContext, PropsWithChildren, useEffect, useState,
} from "react";
import { InitialValue } from "../interfaces/interfaces";

const initialValue = {
  windowWidth: 0,
  setWindowWidth: () => {},
};

export const Context = createContext<InitialValue>(initialValue);

export const StateWidthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () =>
      window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Context.Provider value={{ windowWidth, setWindowWidth }}>
      { children }
    </Context.Provider>
  );
};
