import { keys } from "ts-transformer-keys";
import { structure, InputTypes } from "../interfaces";

export function generate<T extends object>(): structure {
  const typeKeys = keys<T>();

  return typeKeys.reduce((result, key) => {
    return result;
  }, {} as structure);
}

// Convert a JSON/Standard-like schema into EasyForm `structure`
// Supported mappings (best-effort):
// - string => string | email | password | color | date | time | text (via format/ui hints)
// - number/integer => number
// - boolean => radio (Yes/No)
// - enum => select
// - array => list (items mapped recursively). For primitive arrays, a single `value` field is used.
// - object => list with min/max length = 1 (single group) and mapped properties
export function convertFromSchema(schema: any): structure {
  // If the root is an object with properties, convert its properties
  if (schema && schema.type === "object" && schema.properties) {
    const required: string[] = Array.isArray(schema.required)
      ? schema.required
      : [];
    return Object.entries<any>(schema.properties).reduce(
      (acc, [name, prop]) => {
        const field = mapPropertyToInput(name, prop, required.includes(name));
        if (field) acc[name] = field;
        return acc;
      },
      {} as structure
    );
  }

  // Otherwise treat the whole schema as a single-field object named "value"
  const single = mapPropertyToInput("value", schema, false);
  return single ? { value: single } : {};
}

function mapPropertyToInput(
  name: string,
  prop: any,
  isRequired: boolean
): InputTypes | null {
  if (!prop) return null;

  // Common meta
  const label = prop.title || name;
  const description = prop.description;
  const defaultValue = prop.default;

  // Handle enum as select first
  if (Array.isArray(prop.enum)) {
    return {
      type: "select",
      label,
      description,
      required: !!isRequired,
      defaultValue,
      options: prop.enum.map((v: any) => ({
        label: String(v),
        value: String(v),
      })),
    } as any;
  }

  // Resolve format/ui hints for strings
  const uiWidget = prop["ui:widget"] || prop["x-ui"];
  const type = prop.type;

  if (type === "string") {
    const format = prop.format;
    if (format === "email") {
      return {
        type: "email",
        label,
        description,
        required: !!isRequired,
        defaultValue,
        pattern: prop.pattern,
      } as any;
    }
    if (format === "password" || uiWidget === "password") {
      return {
        type: "password",
        label,
        description,
        required: !!isRequired,
        defaultValue,
        minLength: prop.minLength,
        pattern: prop.pattern,
      } as any;
    }
    if (format === "color") {
      return {
        type: "color",
        label,
        description,
        required: !!isRequired,
        defaultValue,
      } as any;
    }
    if (format === "date") {
      return {
        type: "date",
        label,
        description,
        required: !!isRequired,
        defaultValue,
      } as any;
    }
    if (format === "time") {
      return {
        type: "time",
        label,
        description,
        required: !!isRequired,
        defaultValue,
      } as any;
    }
    if (format === "textarea" || uiWidget === "textarea") {
      return {
        type: "text",
        label,
        description,
        required: !!isRequired,
        defaultValue,
        maxLength: prop.maxLength,
        minLength: prop.minLength,
      } as any;
    }
    return {
      type: "string",
      label,
      description,
      required: !!isRequired,
      defaultValue,
      maxLength: prop.maxLength,
      minLength: prop.minLength,
      pattern: prop.pattern,
      placeholder: prop.placeholder,
    } as any;
  }

  if (type === "number" || type === "integer") {
    return {
      type: "number",
      label,
      description,
      required: !!isRequired,
      defaultValue,
      minValue: prop.minimum,
      maxValue: prop.maximum,
    } as any;
  }

  if (type === "boolean") {
    // Map to radio with Yes/No
    return {
      type: "radio",
      label,
      description,
      required: !!isRequired,
      defaultValue:
        typeof defaultValue === "boolean" ? String(defaultValue) : defaultValue,
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    } as any;
  }

  if (type === "array") {
    const items = prop.items || {};
    // Primitive array -> single field named `value`
    if (items && items.type && items.type !== "object" && !items.properties) {
      const valueField = mapPropertyToInput("value", items, false);
      return {
        type: "list",
        label,
        description,
        required: !!isRequired,
        inputs: valueField ? { value: valueField } : {},
        minLength: prop.minItems,
        maxLength: prop.maxItems,
      } as any;
    }

    // Object array -> map object properties
    if (items && (items.type === "object" || items.properties)) {
      const childRequired: string[] = Array.isArray(items.required)
        ? items.required
        : [];
      const inputs = Object.entries<any>(items.properties || {}).reduce(
        (acc, [k, v]) => {
          const f = mapPropertyToInput(k, v, childRequired.includes(k));
          if (f) (acc as any)[k] = f;
          return acc;
        },
        {} as structure
      );

      return {
        type: "list",
        label,
        description,
        required: !!isRequired,
        inputs,
        minLength: prop.minItems,
        maxLength: prop.maxItems,
      } as any;
    }
  }

  if (type === "object" || prop.properties) {
    const childRequired: string[] = Array.isArray(prop.required)
      ? prop.required
      : [];
    const inputs = Object.entries<any>(prop.properties || {}).reduce(
      (acc, [k, v]) => {
        const f = mapPropertyToInput(k, v, childRequired.includes(k));
        if (f) (acc as any)[k] = f;
        return acc;
      },
      {} as structure
    );

    // Represent a single nested group as a fixed-length list (1)
    return {
      type: "list",
      label,
      description,
      required: !!isRequired,
      inputs,
      minLength: 1,
      maxLength: 1,
    } as any;
  }

  // Fallback to string
  return {
    type: "string",
    label,
    description,
    required: !!isRequired,
    defaultValue,
  } as any;
}
