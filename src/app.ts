import express from 'express'
import * as http from 'http'

import { configureRoutes } from './common/routes'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = process.env.PORT

app.use(express.json())
configureRoutes(app)

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
