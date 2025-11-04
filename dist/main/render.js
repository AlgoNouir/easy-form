"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderField = RenderField;
exports.default = EasyForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var index_1 = require("../context/index");
function FallBack(props) {
    // fallback when no component is provided
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 bg-gray-50 rounded border border-gray-200 text-gray-500 text-sm", children: [props.text, " ", (0, jsx_runtime_1.jsx)("strong", { children: props.key })] }));
}
function RenderField(_a) {
    var name = _a.name, field = _a.field, control = _a.control;
    var _b = (0, react_1.useState)(null), previewUrl = _b[0], setPreviewUrl = _b[1];
    var _c = (0, index_1.useEasyFormContext)(), components = _c.components, relations = _c.relations;
    var allValues = (0, react_hook_form_1.useWatch)({ control: control });
    // change field to _field name for relations and many2many fields
    // if type of field is relation or many2many fields, convert to select and fetch thir choice
    var _field = field;
    if (_field.type === "fixed") {
        var _value = _field.fixed_value;
        var fixed_field_value_1 = typeof _value === "function" ? _value(allValues) : _value;
        if (!_field.show)
            return ((0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: name, control: control, defaultValue: fixed_field_value_1, render: function (_a) {
                    var controllerField = _a.field;
                    return ((0, jsx_runtime_1.jsx)("input", __assign({}, controllerField, { type: "hidden", value: fixed_field_value_1, onChange: function () { return controllerField.onChange(fixed_field_value_1); } })));
                } }));
        _field = __assign(__assign({}, _field), { fixed_value: _value, type: "fixed", show: false, value: fixed_field_value_1 });
    }
    // ----------------------------------------------------------------- RELATION
    if (field.type === "relation") {
        // get relations chocies from context main data. error if not exists
        if (!relations)
            return ((0, jsx_runtime_1.jsx)(FallBack, { text: "relation not have any function on provider. relation:" }, field.relationName));
        // create options from functions
        var relationData = relations[field.relationName]();
        var options = relationData.map(function (d) { return ({
            label: d[field.item_label],
            value: d[field.item_value],
        }); });
        // convert relation field to select
        _field = __assign(__assign({}, field), { type: "select", options: options });
    }
    // ----------------------------------------------------------------- MANY 2 MANY
    if (field.type === "many2many") {
        // get relations chocies from context main data. error if not exists
        if (!relations)
            return ((0, jsx_runtime_1.jsx)(FallBack, { text: "relation not have any function on provider. relation:" }, field.relationName));
        // create options from functions
        var relationData = relations[field.relationName]();
        var options = relationData.map(function (d) { return ({
            label: d[field.item_label],
            value: d[field.item_value],
        }); });
        // convert many2many field to multiSelect
        _field = __assign(__assign({}, field), { type: "multiSelect", options: options });
    }
    // ----------------------------------------------------------------- SELECT
    if (_field.type === "select") {
        var _options = _field.options;
        var select_field_options = typeof _options === "function" ? _options(allValues) : _options;
        _field = __assign(__assign({}, _field), { options: select_field_options, type: "select" });
    }
    // ----------------------------------------------------------------- FALLBACK
    // get component from context
    var Component = components === null || components === void 0 ? void 0 : components[_field.type];
    if (!Component) {
        return ((0, jsx_runtime_1.jsx)(FallBack, { text: "Field type not supported or missing component:" }, _field.type));
    }
    // ----------------------------------------------------------------- RENDER
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 rounded-lg max-w-full min-w-0 flex flex-col", children: [(_field === null || _field === void 0 ? void 0 : _field.label) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between w-full", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-gray-700", children: _field.label }), (_field === null || _field === void 0 ? void 0 : _field.required) && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-red-500 font-medium", children: "*" }))] })), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: name, control: control, rules: {
                        required: (_field === null || _field === void 0 ? void 0 : _field.required) ? "This field is required" : false,
                    }, render: function (_a) {
                        var controllerField = _a.field, error = _a.fieldState.error;
                        return ((0, jsx_runtime_1.jsx)(Component, __assign({}, controllerField, _field, { fieldState: error, previewUrl: previewUrl, setPreviewUrl: setPreviewUrl, className: "w-full focus:ring-2 focus:ring-blue-500/20 \n                  transition-all duration-200 max-w-full min-w-0" })));
                    } }) })] }));
}
function EasyForm(_a) {
    // const fields_in_area = useMemo(
    //   () =>
    //     Array(areaMap || []).reduce(
    //       (result, list) => [...result, ...list.flatMap((l) => l)],
    //       [] as string[]
    //     ),
    //   [areaMap]
    // );
    // const fields_not_in_area = useMemo(
    //   () =>
    //     Object.keys(structure).filter((field) => fields_in_area.includes(field)),
    //   [fields_in_area, structure]
    // );
    var structure = _a.structure, control = _a.control, areaMap = _a.areaMap, title = _a.title, description = _a.description;
    // const fields_area = [
    //   ...(areaMap || []),
    //   ...fields_not_in_area.map((f) => Array(areaMap?.length || 1).fill(f)),
    // ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full mx-auto bg-white rounded-xl", children: [(title || description) && ((0, jsx_runtime_1.jsxs)("div", { className: "mb-6 pb-6", children: [title && ((0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold text-gray-800 mb-2", children: title })), description && (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: description })] })), (0, jsx_runtime_1.jsx)("div", { style: areaMap && {
                    gridTemplateAreas: areaMap
                        .map(function (area) { return '"' + area.join(" ") + '"'; })
                        .join(" "),
                }, className: "grid gap-6 w-full max-w-full min-w-0", children: Object.entries(structure).map(function (_a) {
                    var key = _a[0], field = _a[1];
                    return ((0, jsx_runtime_1.jsx)("div", { style: areaMap ? { gridArea: key } : undefined, children: (0, jsx_runtime_1.jsx)(RenderField, { name: key, field: field, control: control }) }, key));
                }) })] }));
}
//# sourceMappingURL=render.js.map