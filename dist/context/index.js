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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEasyFormContext = exports.EasyFormProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// context/EasyFormContext.tsx
var react_1 = __importStar(require("react"));
var EasyFormContext = (0, react_1.createContext)(undefined);
var EasyFormProvider = function (_a) {
    var children = _a.children, components = _a.components;
    return ((0, jsx_runtime_1.jsx)(EasyFormContext.Provider, __assign({ value: { components: components } }, { children: children })));
};
exports.EasyFormProvider = EasyFormProvider;
var useEasyFormContext = function () {
    var ctx = react_1.default.useContext(EasyFormContext);
    if (!ctx) {
        throw new Error("useEasyFormContext must be used within EasyFormProvider");
    }
    return ctx;
};
exports.useEasyFormContext = useEasyFormContext;
//# sourceMappingURL=index.js.map