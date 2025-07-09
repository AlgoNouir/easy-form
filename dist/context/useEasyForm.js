"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEasyFormContext = void 0;
var react_1 = require("react");
var _1 = __importDefault(require("."));
var useEasyFormContext = function () {
    var context = (0, react_1.useContext)(_1.default);
    if (!context) {
        throw new Error("useEasyFormContext must be used within an EasyFormProvider");
    }
    return context;
};
exports.useEasyFormContext = useEasyFormContext;
//# sourceMappingURL=useEasyForm.js.map