// context/EasyFormContext.tsx
import React, { createContext } from "react";
import type { EasyFormComponents } from "../interfaces/components";

type EasyFormContextType = {
  components: EasyFormComponents;
  relations?: {
    [key: string]: () => { [key: string]: any }[];
  };
};

const EasyFormContext = createContext<EasyFormContextType | undefined>(
  undefined
);

export const EasyFormProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & EasyFormContextType) => {
  return (
    <EasyFormContext.Provider value={props}>
      {children}
    </EasyFormContext.Provider>
  );
};

export const useEasyFormContext = () => {
  const ctx = React.useContext(EasyFormContext);
  if (!ctx) {
    throw new Error("useEasyFormContext must be used within EasyFormProvider");
  }
  return ctx;
};
