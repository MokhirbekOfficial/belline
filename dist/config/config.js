"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let config = {
    PORT: getConf('PORT', '3000'),
    MongoPort: parseInt(getConf('MONGO_PORT', '27017')),
    MongoDatabase: getConf('MONGO_DATABASE', 'bellinev1'),
    JwtSecret: getConf('JWT_SECRET', 'qwertysecret'),
    NodeEnv: getConf('NODE_ENV', 'development'),
    MongoPassword: getConf('MONGO_PASSWORD', '200013fev.'),
    Lifetime: getConf('LIFETIME', '30d'),
};
function getConf(name, def = '') {
    if (process.env[name]) {
        return process.env[name] || '';
    }
    return def;
}
exports.default = config;
//# sourceMappingURL=config.js.map