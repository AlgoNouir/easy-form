"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
var ts_transformer_keys_1 = require("ts-transformer-keys");
function generate() {
    var typeKeys = (0, ts_transformer_keys_1.keys)();
    return typeKeys.reduce(function (result, key) {
        return result;
    }, {});
}
//# sourceMappingURL=generate.js.map