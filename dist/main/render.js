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
exports.RenderField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var useEasyForm_1 = require("../context/useEasyForm");
function RenderField(_a) {
    var _b;
    var name = _a.name, field = _a.field, control = _a.control;
    var _c = (0, react_1.useState)(null), previewUrl = _c[0], setPreviewUrl = _c[1];
    var components = (0, useEasyForm_1.useEasyFormContext)().components;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "space-y-2 rounded-lg max-w-full min-w-0 flex flex-col" }, { children: [field.label && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between w-full" }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "text-sm font-semibold text-gray-700" }, { children: field.label })), field.required && ((0, jsx_runtime_1.jsx)("span", __assign({ className: "text-xs text-red-500 font-medium" }, { children: "Required" })))] }))), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex" }, { children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: name, control: control, defaultValue: (_b = field.defaultValue) !== null && _b !== void 0 ? _b : "", rules: {
                        required: field.required ? "This field is required" : false,
                    }, render: function (_a) {
                        var controllerField = _a.field, error = _a.fieldState.error;
                        var baseInputClasses = "w-full focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 max-w-full min-w-0";
                        var Component = components === null || components === void 0 ? void 0 : components[field.type];
                        if (Component) {
                            return ((0, jsx_runtime_1.jsx)(Component, { field: field, fieldState: error, controller: controllerField, previewUrl: previewUrl, setPreviewUrl: setPreviewUrl, className: baseInputClasses }));
                        }
                        // fallback when no component is provided
                        return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-2 bg-gray-50 rounded border border-gray-200 text-gray-500 text-sm" }, { children: ["Field type not supported or missing component:", " ", (0, jsx_runtime_1.jsx)("strong", { children: field.type })] })));
                    } }) }))] })));
}
exports.RenderField = RenderField;
function EasyForm(_a) {
    var structure = _a.structure, control = _a.control, areaMap = _a.areaMap, title = _a.title, description = _a.description;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "w-full mx-auto bg-white rounded-xl" }, { children: [(title || description) && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "mb-6 pb-6" }, { children: [title && ((0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-2xl font-semibold text-gray-800 mb-2" }, { children: title }))), description && (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-600" }, { children: description }))] }))), (0, jsx_runtime_1.jsx)("div", __assign({ style: areaMap && {
                    gridTemplateAreas: areaMap
                        .map(function (area) { return '"' + area.join(" ") + '"'; })
                        .join(" "),
                }, className: "grid gap-6 w-full max-w-full min-w-0" }, { children: Object.entries(structure).map(function (_a) {
                    var key = _a[0], field = _a[1];
                    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: areaMap ? { gridArea: key } : undefined }, { children: (0, jsx_runtime_1.jsx)(RenderField, { name: key, field: field, control: control }) }), key));
                }) }))] })));
}
exports.default = EasyForm;
//# sourceMappingURL=render.js.map