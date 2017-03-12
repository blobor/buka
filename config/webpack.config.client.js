
const configPath = process.env.NODE_ENV !== 'production'
  ? './webpack.config.dev'
  : './webpack.config.prod'

module.exports = require(configPath)
