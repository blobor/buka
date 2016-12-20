const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  apps: [{
    name: 'skipass-web-app',
    script: './dist-server/server.js',
    instances: isDevelopment ? 1 : 'max',
    exec_mode: isDevelopment ? 'fork_mode' : 'cluster',
    merge_logs: true,
    watch: isDevelopment,
    watch_options: {
      usePolling: true,
      alwaysStat: true,
      useFsEvents: false
    }
  }]
}
