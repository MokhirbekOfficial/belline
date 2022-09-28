import { NextFunction, Request, Response } from 'express'
import { storage } from '../storage/main'
import catchAsync from '../utils/catchAsync'
import { message } from '../locales/get_message'

export class NumberController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { limit, page, status } = req.query
        let { search } = req.query
        const postLimit = Number(limit)
        let postPage = Number(page)
        postPage = postLimit * postPage
        if (!search) {
            search = ""
        }

        const numbers = await storage.number.find(postLimit, postPage, status as string, search as string)

        res.status(200).json({
            success: true,
            data: {
                numbers
            },
            message: message('get_200', lang)
        })
    })

    getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const _id = req.params.id

        const number = await storage.number.findOne({ _id })

        res.status(200).json({
            success: true,
            data: {
                number
            },
            message: message('get_200', lang)
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals

        const number = await storage.number.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                number
            },
            message: message('number_created_200', lang)
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const _id = req.params.id

        const number = await storage.number.update({ _id }, req.body)

        res.status(200).json({
            success: true,
            data: {
                number
            },
            message: message('number_updated_200', lang)
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const _id = req.params.id

        await storage.number.delete({ _id })

        res.status(200).json({
            success: true,
            message: message('number_delete_200', lang)
        })
    })
}
