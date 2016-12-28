import { version as appVersion } from '../package.json'

export const port = process.env.PORT || 3333
export const development = process.env.NODE_ENV !== 'production'

export const appName = 'skipass'
export const version = appVersion

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  }
}
