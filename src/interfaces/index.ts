export type MetaData = {
  label: string;
  placeholder: string;
  required: boolean;
  description?: string;
  defaultValue?: any;
};

export type StringInput = {
  type: "string";
  maxLength?: number;
  minLength?: number;
  pattern?: string;
} & MetaData;

export type NumberInput = {
  type: "number";
  maxValue?: number;
  minValue?: number;
} & MetaData;

export type EmailInput = {
  type: "email";
  pattern?: string;
} & MetaData;

export type PasswordInput = {
  type: "password";
  minLength?: number;
  pattern?: string;
} & MetaData;

export type ColorInput = {
  type: "color";
} & MetaData;

export type DateInput = {
  type: "date";
  minDate?: Date;
  maxDate?: Date;
} & MetaData;

export type TimeInput = {
  type: "time";
  minTime?: Date;
  maxTime?: Date;
} & MetaData;

export type TextInput = {
  type: "text";
  maxLength?: number;
  minLength?: number;
} & MetaData;

export type SelectInput = {
  type: "select";
  options: { label: string; value: string }[];
} & MetaData;

export type MultiSelectInput = {
  type: "multiSelect";
  options: { label: string; value: string }[];
  minLength?: number;
  maxLength?: number;
} & MetaData;

export type FileInput = {
  type: "file";
  accept?: string[];
} & MetaData;

export type ImageInput = {
  type: "image";
  accept?: string[];
} & MetaData;

export type CheckboxInput = {
  type: "checkbox";
  options: { label: string; value: boolean }[];
} & MetaData;

export type RadioInput = {
  type: "radio";
  options: { label: string; value: string }[];
} & MetaData;

export type ListInputs = {
  type: "list";
  inputs: structure;
  minLength?: number;
  maxLength?: number;
} & MetaData;

export type RelationInput = {
  type: "relation";
  title: string;
  value: string;
  lazy?: boolean;
} & MetaData;

export type Many2ManyInput = {
  type: "many2many";
  title: string;
  value: string;
  minLength?: number;
  maxLength?: number;
} & MetaData;

export type structure = {
  [key: string]: InputTypes;
};

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
  | Many2ManyInput;
