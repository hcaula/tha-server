import express from 'express'

import FinancialRoutes from '../financial/routes'
import BaseRoutes from '../base/routes'

import { CommonRoutesConfig } from './routes.config'

// Expand route namespaces here!
const routes: Array<CommonRoutesConfig> = [BaseRoutes, FinancialRoutes]

export const configureRoutes = (app: express.Application): void => {
  routes.forEach((route: CommonRoutesConfig) => route.configureRoutes(app))
}
