import { AdminStorage } from './mongo/admin'
import { NumberStorage } from './mongo/number'
interface IStorage {
    admin: AdminStorage
    number: NumberStorage
}

export let storage: IStorage = {
    admin: new AdminStorage(),
    number: new NumberStorage()
}
