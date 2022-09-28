import { INumber } from '../../models/Number'

export interface INumberAllResponse {
    payloads: INumber[]
    count: number
}

export interface NumberRepo {
    find(postLimit: number, postPage: number, status: string, search: string): Promise<Object>
    findOne(query: Object): Promise<INumber>
    create(payload: INumber): Promise<INumber>
    update(id: string, payload: INumber): Promise<INumber>
    delete(id: string): Promise<INumber>
}
