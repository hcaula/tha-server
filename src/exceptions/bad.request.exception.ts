import HttpException from './http.exception'
import { httpStatusCodes } from '../common/http.status.codes'

class BadRequestException extends HttpException {
  constructor(message: string, value: any) {
    super(httpStatusCodes.BAD_REQUEST, message, value)
  }
}

export default BadRequestException
