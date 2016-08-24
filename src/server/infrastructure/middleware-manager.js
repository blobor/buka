import Manager from './Manager.js'

import path from 'path'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import enforce from 'express-sslify'

import morgan from 'morgan'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../../config/webpack.config.dev.js'

const ROOT = '../'

class MiddlewareManager extends Manager {

  configureProductionEnv (app) {
    const staticFolder = path.resolve(__dirname, ROOT, 'dist')
    app.use(enforce.HTTPS({
      // app is behind Heroku load balancer
      trustProtoHeader: true
    }))
    app.use(helmet())
    app.use(compression())
    app.use(express.static(staticFolder))
  }

  configureDevelopmentEnv (app) {
    const staticFolder = path.resolve(__dirname, ROOT, 'src')
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
    app.use(express.static(staticFolder))
  }

}

export default new MiddlewareManager()
