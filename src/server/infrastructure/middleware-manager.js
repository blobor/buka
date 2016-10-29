import helmet from 'helmet'
import compression from 'compression'
import enforce from 'express-sslify'
import handlebars from 'express-handlebars'

import morgan from 'morgan'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../../config/webpack.config.dev.js'

import Manager from './Manager.js'

class MiddlewareManager extends Manager {

  configureCommon (app) {
    const handlebarsFileExtension = 'hbs'

    app.engine(handlebarsFileExtension, handlebars({
      extname: handlebarsFileExtension
    }))
    app.set('view engine', handlebarsFileExtension)
  }

  configureProductionEnv (app) {
    app.use(enforce.HTTPS({
      // app is behind Heroku load balancer
      trustProtoHeader: true
    }))
    app.use(helmet())
    app.use(compression())
  }

  configureDevelopmentEnv (app) {
    const compiler = webpack(webpackConfig)
    const middleware = webpackMiddleware(compiler, {
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
    app.use(middleware)
    app.use(morgan('dev'))
  }

}

export default new MiddlewareManager()
