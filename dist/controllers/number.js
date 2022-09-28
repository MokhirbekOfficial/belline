"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberController = void 0;
const main_1 = require("../storage/main");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const get_message_1 = require("../locales/get_message");
class NumberController {
    constructor() {
        this.getAll = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const { limit, page, status } = req.query;
            let { search } = req.query;
            const postLimit = Number(limit);
            let postPage = Number(page);
            postPage = postLimit * postPage;
            if (!search) {
                search = "";
            }
            const numbers = yield main_1.storage.number.find(postLimit, postPage, status, search);
            res.status(200).json({
                success: true,
                data: {
                    numbers
                },
                message: (0, get_message_1.message)('get_200', lang)
            });
        }));
        this.getOne = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const _id = req.params.id;
            const number = yield main_1.storage.number.findOne({ _id });
            res.status(200).json({
                success: true,
                data: {
                    number
                },
                message: (0, get_message_1.message)('get_200', lang)
            });
        }));
        this.create = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const number = yield main_1.storage.number.create(req.body);
            res.status(201).json({
                success: true,
                data: {
                    number
                },
                message: (0, get_message_1.message)('number_created_200', lang)
            });
        }));
        this.update = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const _id = req.params.id;
            const number = yield main_1.storage.number.update({ _id }, req.body);
            res.status(200).json({
                success: true,
                data: {
                    number
                },
                message: (0, get_message_1.message)('number_updated_200', lang)
            });
        }));
        this.delete = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { lang } = res.locals;
            const _id = req.params.id;
            yield main_1.storage.number.delete({ _id });
            res.status(200).json({
                success: true,
                message: (0, get_message_1.message)('number_delete_200', lang)
            });
        }));
    }
}
exports.NumberController = NumberController;
//# sourceMappingURL=number.js.map