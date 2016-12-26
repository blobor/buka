import morgan from 'morgan'
import handlebars from 'express-handlebars'

import Manager from './Manager.js'

class MiddlewareManager extends Manager {

  configureCommon (app) {
    const handlebarsFileExtension = 'hbs'

    app.disable('etag')
    app.engine(handlebarsFileExtension, handlebars({
      extname: handlebarsFileExtension
    }))
    app.set('view engine', handlebarsFileExtension)
  }

  configureDevelopmentEnv (app) {
    app.use(morgan('dev'))
  }

}

export default new MiddlewareManager()
