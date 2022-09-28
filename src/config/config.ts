import dotenv from 'dotenv'

dotenv.config()

interface Config {
    PORT: string
    MongoPort: number
    MongoDatabase: string
    JwtSecret: string
    NodeEnv: string
    MongoPassword: string
    Lifetime: string
}

let config: Config = {
    PORT: getConf('PORT', '3000'),
    MongoPort: parseInt(getConf('MONGO_PORT', '27017')),
    MongoDatabase: getConf('MONGO_DATABASE', 'bellinev1'),
    JwtSecret: getConf('JWT_SECRET', 'qwertysecret'),
    NodeEnv: getConf('NODE_ENV', 'development'),
    MongoPassword: getConf('MONGO_PASSWORD', '200013fev.'),
    Lifetime: getConf('LIFETIME', '30d'),
}

function getConf(name: string, def: string = ''): string {
    if (process.env[name]) {
        return process.env[name] || ''
    }

    return def
}

export default config
