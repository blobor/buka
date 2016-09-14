import client from '../routes/client-page'
import apiRoute from '../routes/api'

import Manager from './Manager.js'

class RouteManager extends Manager {
  configureCommon (app) {
    app.use('/api', apiRoute)
    app.use('/', client)
  }
}

export default new RouteManager()
