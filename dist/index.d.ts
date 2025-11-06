import * as _EasyForm from "./main/render";
export { convertFromSchema } from "./main/generate";
declare const _default: typeof _EasyForm.default;
export default _default;
export declare const FormProvider: ({ children, ...props }: {
    children: React.ReactNode;
} & {
    components: import("./interfaces/components").EasyFormComponents;
    relations?: {
        [key: string]: () => {
            [key: string]: any;
        }[];
    };
}) => import("react/jsx-runtime").JSX.Element;
export * from "./interfaces/index";
