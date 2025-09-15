export interface MetaData {
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  defaultValue?: any;
}

export interface StringInput extends MetaData {
  type: "string";
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export interface NumberInput extends MetaData {
  type: "number";
  maxValue?: number;
  minValue?: number;
}

export interface EmailInput extends MetaData {
  type: "email";
  pattern?: string;
}

export interface PasswordInput extends MetaData {
  type: "password";
  minLength?: number;
  pattern?: string;
}

export interface ColorInput extends MetaData {
  type: "color";
}

export interface DateInput extends MetaData {
  type: "date";
  minDate?: Date;
  maxDate?: Date;
}

export interface TimeInput extends MetaData {
  type: "time";
  minTime?: Date;
  maxTime?: Date;
}

export interface TextInput extends MetaData {
  type: "text";
  maxLength?: number;
  minLength?: number;
}

export interface SelectInput extends MetaData {
  type: "select";
  options: { label: string; value: string }[];
}

export interface MultiSelectInput extends MetaData {
  type: "multiSelect";
  options: { label: string; value: string }[];
  minLength?: number;
  maxLength?: number;
}

export interface FileInput extends MetaData {
  type: "file";
  accept?: string[];
}

export interface ImageInput extends MetaData {
  type: "image";
  accept?: string[];
}

export interface CheckboxInput extends MetaData {
  type: "checkbox";
  options: { label: string; value: boolean }[];
}

export interface RadioInput extends MetaData {
  type: "radio";
  options: { label: string; value: string }[];
}

export interface ListInputs extends MetaData {
  type: "list";
  inputs: structure;
  minLength?: number;
  maxLength?: number;
}

export interface RelationInput extends MetaData {
  type: "relation";
  item_label: string;
  item_value: string;
  relationName: string;
}

export interface Many2ManyInput extends MetaData {
  type: "many2many";
  item_label: string;
  item_value: string;
  relationName: string;
  minLength?: number;
  maxLength?: number;
}

export interface FixedInput extends MetaData {
  type: "fixed";
  fixed_value: string | number | ((values: { [key in string]: any }) => any);
  show?: boolean;
}

export interface structure {
  [key: string]: InputTypes;
}

export type InputTypes =
  | StringInput
  | NumberInput
  | EmailInput
  | PasswordInput
  | ColorInput
  | DateInput
  | TimeInput
  | TextInput
  | SelectInput
  | MultiSelectInput
  | FileInput
  | ImageInput
  | CheckboxInput
  | RadioInput
  | ListInputs
  | RelationInput
  | Many2ManyInput
  | FixedInput;
