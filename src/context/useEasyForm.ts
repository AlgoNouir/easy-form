import { useContext } from "react";
import EasyFormContext from ".";

export const useEasyFormContext = () => {
  const context = useContext(EasyFormContext);
  if (!context) {
    throw new Error(
      "useEasyFormContext must be used within an EasyFormProvider"
    );
  }
  return context;
};
