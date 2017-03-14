import { Router } from 'express'

import { wrapAsync } from '../utils/express-promise-handle'
import { getSkipass, getSkipassLifts } from '../data-sourses/bukovel-tickets/bukovel'

const router = new Router()

router
  .get('/:skipassID', wrapAsync(async (req, res) => {
    try {
      const skipass = await getSkipass(req.params.skipassID)
      res.json(skipass)
    } catch ({ message }) {
      res.json({
        errors: Array.of(message)
      })
    }
  }))
  .get('/:skipassID/lifts', wrapAsync(async (req, res) => {
    try {
      const lifts = await getSkipassLifts(req.params.skipassID)
      res.json(lifts)
    } catch ({ message }) {
      res.json({
        errors: Array.of(message)
      })
    }
  }))

export default router
