"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const admin_1 = require("./mongo/admin");
const number_1 = require("./mongo/number");
exports.storage = {
    admin: new admin_1.AdminStorage(),
    number: new number_1.NumberStorage()
};
//# sourceMappingURL=main.js.map