"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const number_1 = require("../controllers/number");
const number_2 = require("../validators/number");
const auth_1 = require("../middleware/auth");
const cache_1 = require("../middleware/cache");
const router = (0, express_1.Router)({ mergeParams: true });
const controller = new number_1.NumberController();
const validator = new number_2.NumberValidator();
const middleware = new auth_1.Middleware();
router
    .route('/all')
    .get(middleware.auth(['admin']), (0, cache_1.get)(), controller.getAll, (0, cache_1.set)());
router
    .route('/create')
    .post(middleware.auth(['admin']), validator.create, controller.create, (0, cache_1.clear)());
router
    .route('/:id')
    .get(middleware.auth(['admin']), controller.getOne)
    .patch(middleware.auth(['admin']), validator.update, controller.update, (0, cache_1.clear)())
    .delete(middleware.auth(['admin']), controller.delete, (0, cache_1.clear)());
exports.default = router;
//# sourceMappingURL=number.js.map