import { development } from '../../config.js'

export default class Manager {
  handle (app) {
    if (development) {
      this.configureDevelopmentEnv(app)
    } else {
      this.configureProductionEnv(app)
    }
  }

  configureProductionEnv () {}
  configureDevelopmentEnv () {}
}
