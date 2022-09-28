import { INumber } from '../../models/Number'
import { NumberStorage } from '../../storage/mongo/number'
import Database from '../../core/db'

const storage = new NumberStorage()

beforeAll(async () => {
    const db = new Database()
    await db.connect()
})

describe('Checking storage.number', () => {
    const number = {
        value: "+998919033848",
        monthyPrice: 23.8,
        setupPrice: 100,
        currency: "usd",
        _id: "cd4f1b46-f9ea-4628-a91d-fb414f02a66e"
    }

    const fake_id = '8bf5fc5c-0558-408c-a12f-95dca952a56'

    test('Create new number: succes', () => {
        return storage.create(number as INumber).then((data) => {
            expect(data._id).toEqual(number._id)
        })
    })

    test('Get one number: success', () => {
        return storage.findOne({ _id: number._id }).then((data) => {
            expect(data._id).toEqual(number._id)
        })
    })

    test('Get one number: fail', () => {
        return storage.findOne({ _id: fake_id }).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get update number: success', () => {
        const value = '+99809002818'
        return storage.update(number._id, { value } as INumber).then((data) => {
            expect(data._id).toEqual(number._id)
        })
    })

    test('Get update number: fail', () => {
        const value = '+99809002818'
        return storage.update(fake_id, { value } as INumber).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })

    test('Get delete number: succes', () => {
        return storage.delete(number._id).then((data) => {
            expect(data._id).toEqual(number._id)
        })
    })

    test('Get delete number: fail', () => {
        return storage.delete(fake_id).catch((error) => {
            expect(error.statusCode).toEqual(404)
        })
    })
})
