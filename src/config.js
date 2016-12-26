import { version as appVersion } from '../package.json'

export const port = process.env.PORT || 3333
export const development = process.env.NODE_ENV !== 'production'

export const appName = 'skipass'
export const version = appVersion
