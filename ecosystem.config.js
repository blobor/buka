const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  apps: [{
    name: 'skipass-web-app',
    script: isDevelopment ? './src/server.js' : './dist-server/server.js',
    instances: isDevelopment ? 1 : 'max',
    exec_mode: isDevelopment ? 'fork_mode' : 'cluster',
    exec_interpreter: isDevelopment ? './node_modules/.bin/babel-node' : 'node',
    merge_logs: true,
    watch: isDevelopment ? ['src'] : false,
    watch_options: {
      usePolling: true,
      alwaysStat: true,
      useFsEvents: false
    }
  }]
}
