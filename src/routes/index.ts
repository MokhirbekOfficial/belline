import express, { Router } from 'express'
import path from 'path'
import adminRouter from './admin'
import numberRouter from './number'
const router = Router({ mergeParams: true })

router.use('/file', express.static(path.join(__dirname, '../../uploads')))
router.use('/admin', adminRouter)
router.use('/number', numberRouter)

export default router