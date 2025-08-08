import React from "react";
import type { EasyFormComponents } from "../interfaces/components";
interface RelationSelectors {
    [key: string]: () => {
        [key: string]: any;
    }[];
}
interface EasyFormContextType {
    components: EasyFormComponents;
    relations?: RelationSelectors;
}
export declare const EasyFormProvider: ({ children, components, }: {
    children: React.ReactNode;
    components: EasyFormComponents;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useEasyFormContext: () => EasyFormContextType;
export {};
