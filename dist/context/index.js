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
exports.EasyFormProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// context/EasyFormContext.tsx
var react_1 = require("react");
var EasyFormContext = (0, react_1.createContext)(undefined);
var EasyFormProvider = function (_a) {
    var children = _a.children, components = _a.components;
    return ((0, jsx_runtime_1.jsx)(EasyFormContext.Provider, __assign({ value: { components: components } }, { children: children })));
};
exports.EasyFormProvider = EasyFormProvider;
exports.default = EasyFormContext;
//# sourceMappingURL=index.js.map