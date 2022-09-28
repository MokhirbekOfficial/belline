import { NumberRepo, INumberAllResponse } from '../repo/number'
import Number, { INumber } from '../../models/Number'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class NumberStorage implements NumberRepo {
    private scope = 'storage.number'

    async find(postLimit: number, postPage: number, status: string, search: string): Promise<Object> {
        try {
            let dbObj = await Number.aggregate([
                { $match: { status: status, value: { $regex: search } } },
                { $sort: { createdAt: -1 } },
                { $skip: postPage },
                { $limit: postLimit }
            ])

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<INumber> {
        try {
            let dbObj = await Number.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'number_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: INumber): Promise<INumber> {
        try {
            let dbObj = await Number.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: Object, payload: INumber): Promise<INumber> {
        try {
            let dbObj = await Number.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'number_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(id: Object): Promise<any> {
        try {
            let dbObj = await Number.findByIdAndDelete(id)

            if (!dbObj) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'number_404')
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
