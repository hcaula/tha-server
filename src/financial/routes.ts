import express from 'express'
import { checkSchema } from 'express-validator'

import { CommonRoutesConfig } from '../common/routes.config'
import validationsMiddleware from '../middlewares/validations.middleware'

import getHealthStatusSchema from './health.status.schema'

class FinancialRoutes extends CommonRoutesConfig {
  constructor() {
    super({ name: 'FinancialRoutes', baseRoute: '/financial' })
  }

  configureRoutes(app: express.Application) {
    app
      .route(`${this.baseRoute}/health`)
      .get(
        checkSchema(getHealthStatusSchema),
        validationsMiddleware,
        (req: express.Request, res: express.Response) => {
          res.send('Success!')
        }
      )
  }
}

export default new FinancialRoutes()
