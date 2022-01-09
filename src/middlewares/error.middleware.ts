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
  const { INTERNAL_SERVER_ERROR } = httpStatusCodes

  const status = error.status || INTERNAL_SERVER_ERROR
  const value = error.value
  const message =
    status === INTERNAL_SERVER_ERROR
      ? httpErrorMessages.INTERNAL_SERVER_ERROR
      : error.message

  const body = { status, message, value }
  res.status(status).send(_.omitBy(body, _.isNil))
}

export default errorMiddleware
