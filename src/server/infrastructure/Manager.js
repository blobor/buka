import { development } from '../../config.js'

export default class Manager {
  handle (app) {
    this.configureCommon(app)

    if (development) {
      this.configureDevelopmentEnv(app)
    } else {
      this.configureProductionEnv(app)
    }
  }

  configureCommon () {}

  configureProductionEnv () {}
  configureDevelopmentEnv () {}
}
