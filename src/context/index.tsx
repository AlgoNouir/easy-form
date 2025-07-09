// context/EasyFormContext.tsx
import React, { createContext, useContext } from "react";
import { EasyFormComponents } from "../interfaces/components";

type EasyFormContextType = {
  components: EasyFormComponents;
};

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

export default EasyFormContext;
