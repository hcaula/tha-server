import express from 'express'

export abstract class CommonRoutesConfig {
  name: string
  baseRoute: string

  constructor(options: { name: string; baseRoute: string }) {
    this.name = options.name
    this.baseRoute = options.baseRoute
  }

  abstract configureRoutes(app: express.Application): void
}
