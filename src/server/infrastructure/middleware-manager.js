import Manager from './Manager.js'

import helmet from 'helmet'
import compression from 'compression'
import enforce from 'express-sslify'

import morgan from 'morgan'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../../config/webpack.config.dev.js'

class MiddlewareManager extends Manager {

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
