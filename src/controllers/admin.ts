import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'
import { compare, hash, genSalt } from 'bcrypt'
import { signToken } from '../middleware/auth'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import sharp from 'sharp'
import { unlink } from 'fs/promises'

export class AdminController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id } = res.locals

        const admin = await storage.admin.findSuperAdmin({ _id: id })

        if (admin.role !== 'superadmin') {
            return next(new AppError(403, 'auth_403'))
        }

        const admins = await storage.admin.find({ role: 'admin' })

        res.status(200).json({
            success: true,
            data: {
                admins
            },
            message: message('get_200', lang)
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id } = res.locals
        const _id = req.params.id

        let admin = await storage.admin.findSuperAdmin({ _id: id })

        if (admin.role === 'admin' && id !== _id) {
            return next(new AppError(403, 'auth_403'))
        }

        admin = await storage.admin.findOne({ _id })

        res.status(200).json({
            success: true,
            data: {
                admin
            },
            message: message('get_200', lang)
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id } = res.locals

        let admin = await storage.admin.findSuperAdmin({ _id: id })

        if (admin.role !== 'superadmin') {
            return next(new AppError(403, 'auth_403'))
        }
        const salt = await genSalt()
        req.body.password = await hash(req.body.password, salt)
        req.body.role = 'admin'

        admin = await storage.admin.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                admin
            },
            message: message('admin_created_200', lang)
        })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { login, password } = req.body
        const admin = await storage.admin.findLogin({ login })
        if ((!admin) || (!(await compare(password, admin.password)))) {
            return next(new AppError(401, 'auth_401.2'))
        }

        const token = await signToken(admin.id, 'admin')

        res.status(201).json({
            success: true,
            data: {
                admin,
                token
            },
            message: message('admin_logged_200', lang)
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { old_password, new_password } = req.body
        const { lang, id } = res.locals
        const _id = req.params.id

        let admin = await storage.admin.findSuperAdmin({ _id: id })

        if ((admin.role === 'admin') && (id !== _id)) {
            return next(new AppError(403, 'auth_403'))
        }

        if (admin.role === 'admin' && !old_password) {
            return next(new AppError(401, 'old_password_401'))
        }
        if (new_password && old_password) {
            if (!(await compare(old_password, admin.password))) {
                return next(new AppError(401, 'auth_401'))
            }

            const salt = await genSalt()
            req.body.password = await hash(new_password, salt)
        } else if (admin.role === 'superadmin') {
            admin = await storage.admin.findOne({ _id })
            if (new_password) {
                const salt = await genSalt()
                req.body.password = await hash(new_password, salt)
            }
        }

        if (req.file) {
            const photo = `adminAvatar/${req.file.fieldname}-${uuidv4()}.png`

            await sharp(req.file.buffer)
                .png()
                .toFile(join(__dirname, '../../uploads', photo))
            if (admin.avatar) {
                await unlink(join(__dirname, '../../uploads', admin.avatar))
            }
            req.body.avatar = photo
        }

        admin = await storage.admin.update({ _id }, req.body)

        res.status(200).json({
            success: true,
            data: {
                admin
            },
            message: message('admin_updated_200', lang)
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id, lang } = res.locals
        const _id = req.params.id
        await storage.admin.findSuperAdmin({ _id: id, role: "superadmin" })
        const admin = await storage.admin.findOne({ _id })
        if (admin.avatar) {
            await unlink(join(__dirname, '../../uploads', admin.avatar))
        }
        await storage.admin.delete({ _id })

        res.status(200).json({
            success: true,
            message: message('admin_delete_200', lang)
        })
    })

    createSuperAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { password } = req.body

        const salt = await genSalt()
        const hashed_password = await hash(password, salt)

        const admin = await storage.admin.create({
            ...req.body,
            password: hashed_password,
            role: 'superadmin'
        })

        const token = await signToken(admin.id, 'admin')

        res.status(201).json({
            success: true,
            data: {
                admin,
                token
            },
            message: message('superadmin_created_200', lang)
        })
    })
}
