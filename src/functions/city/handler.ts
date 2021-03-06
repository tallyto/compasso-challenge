import 'source-map-support/register'
import { middyfy } from '@libs/lambda'
import { cityFactory } from '@factory/city-factory'
import { bootstrap } from 'src/util/dynamoose'

export interface HandlerResponse {
  statusCode: number
  body: string
}

const city = async (event: any): Promise<HandlerResponse> => {
  bootstrap()
  const city = cityFactory()
  let result = null
  const { httpMethod, body } = event
  const id = event.pathParameters ? event.pathParameters.id : null
  const nome = event.queryStringParameters ? event.queryStringParameters.nome : null
  const estado = event.queryStringParameters ? event.queryStringParameters.estado : null

  try {
    switch (httpMethod) {
      case 'GET':
        if (id) {
          result = await city.find(id)
        } else if (nome) {
          result = await city.findCityByName(nome)
        } else if (estado) {
          result = await city.findCityByState(estado)
        }
        break
      case 'POST':
        result = await city.create(body)
        break
      case 'PUT':
        result = await city.update(id, body)
        break
      case 'DELETE':
        result = await city.delete(id)
        break
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    }
  }
}

export const main = middyfy(city)
