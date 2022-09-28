import { Router } from 'express'
import { NumberController } from '../controllers/number'
import { NumberValidator } from '../validators/number'
import { Middleware } from '../middleware/auth'
import { get, set, clear } from '../middleware/cache'

const router = Router({ mergeParams: true })
const controller = new NumberController()
const validator = new NumberValidator()
const middleware = new Middleware()

router
    .route('/all')
    .get(middleware.auth(['admin']), get(), controller.getAll, set())
router
    .route('/create')
    .post(middleware.auth(['admin']), validator.create, controller.create, clear())
router
    .route('/:id')
    .get(middleware.auth(['admin']), controller.getOne)
    .patch(middleware.auth(['admin']), validator.update, controller.update, clear())
    .delete(middleware.auth(['admin']), controller.delete, clear())

export default router