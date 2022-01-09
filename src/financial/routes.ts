import express from 'express'
import { checkSchema } from 'express-validator'

import { CommonRoutesConfig } from '../common/routes.config'
import validationsMiddleware from '../middlewares/validations.middleware'

import getHealthStatusSchema from './health/schema'
import FinancialHealthController from './health/controller'

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
        FinancialHealthController.getHealthStatus
      )
  }
}

export default new FinancialRoutes()
