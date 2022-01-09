import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

function camelizeQueryParamsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.query = _.transform(
    req.query,
    (result, value, key) => (result[_.camelCase(key)] = value)
  )

  next()
}

export default camelizeQueryParamsMiddleware
