import path from 'path'
import express from 'express'

import Manager from './Manager.js'

class AssetsManager extends Manager {
  configureProductionEnv (app) {
    const staticFolder = path.resolve(__dirname, '../', 'dist')

    app.use(express.static(staticFolder))
    app.set('views', staticFolder)
  }

  configureDevelopmentEnv (app) {
    const staticFolder = path.resolve(__dirname, '../../../', 'src')

    app.use(express.static(staticFolder))
    app.set('views', staticFolder)
  }
}

export default new AssetsManager()
