import path from 'path'
import express from 'express'
import { path as root } from 'app-root-path'

import Manager from './Manager.js'

class AssetsManager extends Manager {
  configureProductionEnv (app) {
    const staticFolder = path.resolve(root, 'dist')

    app.use(express.static(staticFolder))
    app.set('views', staticFolder)
  }

  configureDevelopmentEnv (app) {
    const staticFolder = path.resolve(root, 'src')

    app.use(express.static(staticFolder))
    app.set('views', staticFolder)
  }
}

export default new AssetsManager()
