import express from 'express'
import * as http from 'http'

import { configureRoutes } from './common/routes'
import camelizeQueryParamsMiddleware from './middlewares/camelizeQueryParams.middleware'
import errorMiddleware from './middlewares/error.middleware'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = process.env.PORT

app.use(express.json())
app.use(camelizeQueryParamsMiddleware)
configureRoutes(app)
app.use(errorMiddleware)

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
