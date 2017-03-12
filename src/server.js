import 'babel-polyfill'
import express from 'express'

import * as config from './config.js'
import middlewareManager from './server/infrastructure/middleware-manager.js'
import routeManager from './server/infrastructure/route-manager.js'

const app = express()

middlewareManager.handle(app)
routeManager.handle(app)

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`)
  console.log(`env = ${app.get('env')}`)
  console.log(`__dirname = ${__dirname}`)
})
