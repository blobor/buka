import { Router } from 'express'

import { wrapAsync } from '../utils/express-promise-handle'
import { getSkipass, getSkipassLifts } from '../data-sourses/bukovel-tickets/bukovel'

const router = new Router()

router
  .get('/:skipassID', wrapAsync(async (req, res) => {
    try {
      const skipass = await getSkipass(req.params.skipassID)
      res.json(skipass)
    } catch (error) {
      res.json({
        errors: Array.of(error)
      })
    }
  }))
  .get('/:skipassID/lifts', wrapAsync(async (req, res) => {
    try {
      const lifts = await getSkipassLifts(req.params.skipassID)
      res.json(lifts)
    } catch (error) {
      res.json({
        errors: Array.of(error)
      })
    }
  }))

export default router
