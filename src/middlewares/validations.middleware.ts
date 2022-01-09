import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import BadRequestException from '../exceptions/bad.request.exception'
import HttpException from '../exceptions/http.exception'

function validationsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = validationResult(req).array({ onlyFirstError: true })[0]
  if (error) next(new BadRequestException(error.msg, error.param))
  else next()
}

export default validationsMiddleware
