import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

import HttpException from '../exceptions/http.exception'
import { httpStatusCodes, httpErrorMessages } from '../common/httpStatus'

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || httpStatusCodes.INTERNAL_SERVER_ERROR
  const message = error.message || httpErrorMessages.INTERNAL_SERVER_ERROR
  const value = error.value

  const body = { status, message, value }
  res.status(status).send(_.omitBy(body, _.isNil))
}

export default errorMiddleware
