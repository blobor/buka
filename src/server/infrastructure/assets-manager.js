import { resolve } from 'path'
import { path as root } from 'app-root-path'

import Manager from './Manager.js'

class AssetsManager extends Manager {
  configureProductionEnv (app) {
    const staticFolder = resolve(root, 'dist')

    app.set('views', staticFolder)
  }

  configureDevelopmentEnv (app) {
    const staticFolder = resolve(root, 'src')
    app.set('views', staticFolder)
  }
}

export default new AssetsManager()
