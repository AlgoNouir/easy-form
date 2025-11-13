"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFromSchema = convertFromSchema;
// Convert a JSON/Standard-like schema into EasyForm `structure`
// Supported mappings (best-effort):
// - string => string | email | password | color | date | time | text (via format/ui hints)
// - number/integer => number
// - boolean => radio (Yes/No)
// - enum => select
// - array => list (items mapped recursively). For primitive arrays, a single `value` field is used.
// - object => list with min/max length = 1 (single group) and mapped properties
function convertFromSchema(schema) {
    // If the root is an object with properties, convert its properties
    if (schema && schema.type === "object" && schema.properties) {
        var required_1 = Array.isArray(schema.required)
            ? schema.required
            : [];
        return Object.entries(schema.properties).reduce(function (acc, _a) {
            var name = _a[0], prop = _a[1];
            var field = mapPropertyToInput(name, prop, required_1.includes(name));
            if (field)
                acc[name] = field;
            return acc;
        }, {});
    }
    // Otherwise treat the whole schema as a single-field object named "value"
    var single = mapPropertyToInput("value", schema, false);
    return single ? { value: single } : {};
}
function mapPropertyToInput(name, prop, isRequired) {
    if (!prop)
        return null;
    // Common meta
    var label = prop.title || name;
    var description = prop.description;
    var defaultValue = prop.default;
    var hint = prop.hint ||
        prop["x-hint"] ||
        prop["ui:hint"] ||
        prop["ui:help"] ||
        undefined;
    // Handle enum as select first
    if (Array.isArray(prop.enum)) {
        return {
            type: "select",
            label: label,
            description: description,
            required: !!isRequired,
            defaultValue: defaultValue,
            hint: hint,
            options: prop.enum.map(function (v) { return ({
                label: String(v),
                value: String(v),
            }); }),
        };
    }
    // Resolve format/ui hints for strings
    var uiWidget = prop["ui:widget"] || prop["x-ui"];
    var type = prop.type;
    if (type === "string") {
        var format = prop.format;
        if (format === "email") {
            return {
                type: "email",
                label: label,
                description: description,
                required: !!isRequired,
                defaultValue: defaultValue,
                hint: hint,
                pattern: prop.pattern,
            };
        }
        if (format === "password" || uiWidget === "password") {
            return {
                type: "password",
                label: label,
                description: description,
                required: !!isRequired,
                defaultValue: defaultValue,
                hint: hint,
                minLength: prop.minLength,
                pattern: prop.pattern,
            };
        }
        if (format === "color") {
            return {
                type: "color",
                label: label,
                description: description,
                required: !!isRequired,
                defaultValue: defaultValue,
                hint: hint,
            };
        }
        if (format === "date") {
            return {
                type: "date",
                label: label,
                description: description,
                required: !!isRequired,
                defaultValue: defaultValue,
                hint: hint,
            };
        }
        if (format === "time") {
            return {
                type: "time",
                label: label,
                description: description,
                required: !!isRequired,
                defaultValue: defaultValue,
                hint: hint,
            };
        }
        if (format === "textarea" || uiWidget === "textarea") {
            return {
                type: "text",
                label: label,
                description: description,
                required: !!isRequired,
                defaultValue: defaultValue,
                hint: hint,
                maxLength: prop.maxLength,
                minLength: prop.minLength,
            };
        }
        return {
            type: "string",
            label: label,
            description: description,
            required: !!isRequired,
            defaultValue: defaultValue,
            hint: hint,
            maxLength: prop.maxLength,
            minLength: prop.minLength,
            pattern: prop.pattern,
            placeholder: prop.placeholder,
        };
    }
    if (type === "number" || type === "integer") {
        return {
            type: "number",
            label: label,
            description: description,
            required: !!isRequired,
            defaultValue: defaultValue,
            hint: hint,
            minValue: prop.minimum,
            maxValue: prop.maximum,
        };
    }
    if (type === "boolean") {
        // Map to radio with Yes/No
        return {
            type: "radio",
            label: label,
            description: description,
            required: !!isRequired,
            defaultValue: typeof defaultValue === "boolean" ? String(defaultValue) : defaultValue,
            hint: hint,
            options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
            ],
        };
    }
    if (type === "array") {
        var items = prop.items || {};
        // Primitive array -> single field named `value`
        if (items && items.type && items.type !== "object" && !items.properties) {
            var valueField = mapPropertyToInput("value", items, false);
            return {
                type: "list",
                label: label,
                description: description,
                required: !!isRequired,
                hint: hint,
                inputs: valueField ? { value: valueField } : {},
                minLength: prop.minItems,
                maxLength: prop.maxItems,
            };
        }
        // Object array -> map object properties
        if (items && (items.type === "object" || items.properties)) {
            var childRequired_1 = Array.isArray(items.required)
                ? items.required
                : [];
            var inputs = Object.entries(items.properties || {}).reduce(function (acc, _a) {
                var k = _a[0], v = _a[1];
                var f = mapPropertyToInput(k, v, childRequired_1.includes(k));
                if (f)
                    acc[k] = f;
                return acc;
            }, {});
            return {
                type: "list",
                label: label,
                description: description,
                required: !!isRequired,
                hint: hint,
                inputs: inputs,
                minLength: prop.minItems,
                maxLength: prop.maxItems,
            };
        }
    }
    if (type === "object" || prop.properties) {
        var childRequired_2 = Array.isArray(prop.required)
            ? prop.required
            : [];
        var inputs = Object.entries(prop.properties || {}).reduce(function (acc, _a) {
            var k = _a[0], v = _a[1];
            var f = mapPropertyToInput(k, v, childRequired_2.includes(k));
            if (f)
                acc[k] = f;
            return acc;
        }, {});
        // Represent a single nested group as a fixed-length list (1)
        return {
            type: "list",
            label: label,
            description: description,
            required: !!isRequired,
            hint: hint,
            inputs: inputs,
            minLength: 1,
            maxLength: 1,
        };
    }
    // Fallback to string
    return {
        type: "string",
        label: label,
        description: description,
        required: !!isRequired,
        defaultValue: defaultValue,
        hint: hint,
    };
}
//# sourceMappingURL=generate.js.map