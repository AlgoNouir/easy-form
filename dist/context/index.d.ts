import React from "react";
import { EasyFormComponents } from "../interfaces/components";
type EasyFormContextType = {
    components: EasyFormComponents;
};
declare const EasyFormContext: React.Context<EasyFormContextType | undefined>;
export declare const EasyFormProvider: ({ children, components, }: {
    children: React.ReactNode;
    components: EasyFormComponents;
}) => import("react/jsx-runtime").JSX.Element;
export default EasyFormContext;
