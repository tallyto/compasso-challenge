import * as dynamose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'

export interface CityModel extends Document {
  id: string
  nome: string
  estado: string
  createdAt: string
  updatedAt: string
}

const CitySchema = new dynamose.Schema({
  id: {
    hashKey: true,
    type: String
  },
  nome: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  }
}, {
  saveUnknown: false,
  timestamps: true
})
const createTable = process.env.IS_LOCAL === 'true'
export const cityModel = dynamose.model<CityModel>(process.env.CITY_TABLE, CitySchema, { create: createTable })
