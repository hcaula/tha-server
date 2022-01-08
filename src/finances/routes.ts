import express from 'express'

import { CommonRoutesConfig } from '../common/routes.config'

class FinancesRoutes extends CommonRoutesConfig {
  constructor() {
    super({ name: 'FinancesRoutes', baseRoute: '/finances' })
  }

  configureRoutes(app: express.Application) {
    app
      .route(`${this.baseRoute}`)
      .get((req: express.Request, res: express.Response) => res.send('Hello!'))
  }
}

export default new FinancesRoutes()
