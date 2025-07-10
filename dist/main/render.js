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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderField = RenderField;
exports.default = EasyForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var index_1 = require("../context/index");
function RenderField(_a) {
    var name = _a.name, field = _a.field, control = _a.control;
    var _b = (0, react_1.useState)(null), previewUrl = _b[0], setPreviewUrl = _b[1];
    var components = (0, index_1.useEasyFormContext)().components;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 rounded-lg max-w-full min-w-0 flex flex-col", children: [field.label && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between w-full", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-gray-700", children: field.label }), field.required && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-red-500 font-medium", children: "Required" }))] })), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: name, control: control, rules: {
                        required: field.required ? "This field is required" : false,
                    }, render: function (_a) {
                        var controllerField = _a.field, error = _a.fieldState.error;
                        var baseInputClasses = "w-full focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 max-w-full min-w-0";
                        var Component = components === null || components === void 0 ? void 0 : components[field.type];
                        if (Component) {
                            return ((0, jsx_runtime_1.jsx)(Component, __assign({}, controllerField, field, { fieldState: error, previewUrl: previewUrl, setPreviewUrl: setPreviewUrl, className: baseInputClasses })));
                        }
                        // fallback when no component is provided
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 bg-gray-50 rounded border border-gray-200 text-gray-500 text-sm", children: ["Field type not supported or missing component:", " ", (0, jsx_runtime_1.jsx)("strong", { children: field.type })] }));
                    } }) })] }));
}
function EasyForm(_a) {
    var structure = _a.structure, control = _a.control, areaMap = _a.areaMap, title = _a.title, description = _a.description;
    var fields_in_area = (0, react_1.useMemo)(function () {
        return Array(areaMap || []).reduce(function (result, list) { return __spreadArray(__spreadArray([], result, true), list.flatMap(function (l) { return l; }), true); }, []);
    }, [areaMap]);
    var fields_not_in_area = (0, react_1.useMemo)(function () {
        return Object.keys(structure).filter(function (field) { return fields_in_area.includes(field); });
    }, [fields_in_area, structure]);
    var fields_area = __spreadArray(__spreadArray([], (areaMap || []), true), fields_not_in_area.map(function (f) { return Array((areaMap === null || areaMap === void 0 ? void 0 : areaMap.length) || 1).fill(f); }), true);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full mx-auto bg-white rounded-xl", children: [(title || description) && ((0, jsx_runtime_1.jsxs)("div", { className: "mb-6 pb-6", children: [title && ((0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold text-gray-800 mb-2", children: title })), description && (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: description })] })), (0, jsx_runtime_1.jsx)("div", { style: {
                    gridTemplateAreas: fields_area
                        .map(function (area) { return '"' + area.join(" ") + '"'; })
                        .join(" "),
                }, className: "grid gap-6 w-full max-w-full min-w-0", children: Object.entries(structure).map(function (_a) {
                    var key = _a[0], field = _a[1];
                    return ((0, jsx_runtime_1.jsx)("div", { style: areaMap ? { gridArea: key } : undefined, children: (0, jsx_runtime_1.jsx)(RenderField, { name: key, field: field, control: control }) }, key));
                }) })] }));
}
//# sourceMappingURL=render.js.map