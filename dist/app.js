"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = require("./config/logger");
const error_1 = require("./controllers/error");
const lang_1 = require("./middleware/lang");
const app = (0, express_1.default)();
let server = http_1.default.createServer(app);
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, logger_1.expressLogger)());
app.use(lang_1.langMiddleware);
app.use('/v1', index_1.default);
app.get('/status', (req, res) => {
    res.json({
        status: 'OK'
    });
});
const errorController = new error_1.ErrorController();
app.use(errorController.handle);
exports.default = server;
//# sourceMappingURL=app.js.map