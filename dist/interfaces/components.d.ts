/// <reference types="react" />
import type { InputTypes } from ".";
type componentNames = InputTypes["type"];
export type EasyFormComponents = {
    [key in componentNames]: React.ComponentType<any>;
};
export {};
