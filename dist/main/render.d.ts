import type { InputTypes, structure } from "../interfaces";
interface RenderFieldProps {
    name: string;
    field: InputTypes;
    control: any;
}
export declare function RenderField({ name, field, control }: RenderFieldProps): import("react/jsx-runtime").JSX.Element;
export default function EasyForm({ structure, control, areaMap, title, description, }: {
    structure: structure;
    control: any;
    areaMap?: string[][];
    title?: string;
    description?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
