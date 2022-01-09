import express from 'express'

import FinancialRoutes from '../financial/routes'

import { CommonRoutesConfig } from './routes.config'

// Expand route namespaces here!
const routes: Array<CommonRoutesConfig> = [FinancialRoutes]

export const configureRoutes = (app: express.Application): void => {
  routes.forEach((route: CommonRoutesConfig) => route.configureRoutes(app))
}
