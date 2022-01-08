import express from 'express'

import FinancesRoutes from '../finances/routes'

import { CommonRoutesConfig } from './routes.config'

// Expand route namespaces here!
const routes: Array<CommonRoutesConfig> = [FinancesRoutes]

export const configureRoutes = (app: express.Application): void => {
  routes.forEach((route: CommonRoutesConfig) => route.configureRoutes(app))
}
