import express from 'express'

import { CommonRoutesConfig } from '../common/routes.config'

class BaseRoutes extends CommonRoutesConfig {
  constructor() {
    super({ name: 'BaselRoutes', baseRoute: '' })
  }

  configureRoutes(app: express.Application) {
    app
      .route(`${this.baseRoute}/health-check`)
      .get((_, res) => res.status(200).send('OK'))
  }
}

export default new BaseRoutes()
