import mongpose, { Schema, Document, model } from "mongoose"
import { v4 as uuidv4 } from "uuid"
export interface INumber extends Document {
    _id: string
    value: string
    monthyPrice: number
    setupPrice: number
    currency: string
    status: string
    createdAt: number
    updatedAt: number
}

const numberSchema = new Schema<INumber>({
    _id: {
        type: String,
        default: uuidv4
    },
    value: {
        type: String,
        unique: true,
        required: true
    },
    monthyPrice: {
        type: Number,
        required: true
    },
    setupPrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'sold'],
        default: 'active'
    }
}, { timestamps: true })

export default model<INumber>('Number', numberSchema)