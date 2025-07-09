// context/EasyFormContext.tsx
import React, { createContext } from "react";
import type { EasyFormComponents } from "../interfaces/components";

interface EasyFormContextType {
  components: EasyFormComponents;
}

const EasyFormContext = createContext<EasyFormContextType | undefined>(
  undefined
);

export const EasyFormProvider = ({
  children,
  components,
}: {
  children: React.ReactNode;
  components: EasyFormComponents;
}) => {
  return (
    <EasyFormContext.Provider value={{ components }}>
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
