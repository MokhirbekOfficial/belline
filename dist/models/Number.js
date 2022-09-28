"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const numberSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    value: {
        type: String,
        unique: true,
        required: true
    },
    monthyPrice: {
        type: Number,
        required: true
    },
    setupPrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'sold'],
        default: 'active'
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Number', numberSchema);
//# sourceMappingURL=Number.js.map