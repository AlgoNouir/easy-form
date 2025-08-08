import React from "react";
import type { EasyFormComponents } from "../interfaces/components";
type EasyFormContextType = {
    components: EasyFormComponents;
    relations?: {
        [key: string]: () => {
            [key: string]: any;
        }[];
    };
};
export declare const EasyFormProvider: ({ children, ...props }: {
    children: React.ReactNode;
} & EasyFormContextType) => import("react/jsx-runtime").JSX.Element;
export declare const useEasyFormContext: () => EasyFormContextType;
export {};
