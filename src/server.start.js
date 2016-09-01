const pm2 = require('pm2')

const MACHINE_NAME = 'buka_heroku'
const PRIVATE_KEY = process.env.KEYMETRICS_PRIVATE_KEY
const PUBLIC_KEY = process.env.KEYMETRICS_PUBLIC_KEY

// Set by Heroku or -1 to scale to max cpu core -1
const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512

pm2.connect(true, () => {
  pm2.start({
    script: 'server.js',
    name: 'buka-production-app',
    exec_mode: 'cluster',
    instances: instances,
    max_memory_restart: `${maxMemory}M`
  }, () => {
    pm2.interact(PRIVATE_KEY, PUBLIC_KEY, MACHINE_NAME, () => {
      // Display logs in standard output
      pm2.launchBus((err, bus) => {
        if (err) {
          console.error(`[App:buka-production-app][Err] launchBus ${err}`)
        }

        console.log('[PM2] Log streaming started')

        bus.on('log:out', packet => {
          console.log('[App:%s] %s', packet.process.name, packet.data)
        })

        bus.on('log:err', packet => {
          console.error('[App:%s][Err] %s', packet.process.name, packet.data)
        })
      })
    })
  })
})
