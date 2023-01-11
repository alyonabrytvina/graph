import React, {
  createContext, PropsWithChildren, useCallback, useEffect, useState,
} from "react";
import { initialValueStateWidthContextParams, WindowSizeParams } from "../interfaces/interfaces";

const initialValueStateWidthContext = {
  windowSize: {
    windowWidth: 0,
    windowHeight: 0,
  },
  setWindowSize: () => {},
};

export const StateWidthContext = createContext<initialValueStateWidthContextParams>(initialValueStateWidthContext);

export const StateWidthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [windowSize, setWindowSize] = useState<WindowSizeParams>({ windowWidth: 0, windowHeight: 0 });

  const updateDimensions = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ windowWidth: innerWidth, windowHeight: innerHeight });
  }, [windowSize]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () =>
      window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <StateWidthContext.Provider value={{ windowSize, setWindowSize }}>
      { children }
    </StateWidthContext.Provider>
  );
};
