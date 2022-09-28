import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
export class NumberValidator {

    private createSchema = Joi.object({
        value: Joi.string().required(),
        monthyPrice: Joi.number().required(),
        setupPrice: Joi.number().required(),
        currency: Joi.string().required()
    })

    private updateSchema = Joi.object({
        _id: Joi.forbidden(),
        value: Joi.string(),
        monthyPrice: Joi.number(),
        setupPrice: Joi.number(),
        currency: Joi.string(),
        status: Joi.string().valid('active', 'sold')
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}