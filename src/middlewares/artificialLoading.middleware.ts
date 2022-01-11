import { NextFunction, Request, Response } from 'express'

const TIMEOUT_INTERVAL = 1

function artificialLoading(req: Request, res: Response, next: NextFunction) {
  /* istanbul ignore next */
  if (process.env.ENVIRONMENT !== 'development') next()

  new Promise((resolve) => setTimeout(resolve, TIMEOUT_INTERVAL)).then(next)
}

export default artificialLoading
