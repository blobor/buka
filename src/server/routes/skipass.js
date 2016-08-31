import { Router } from 'express'

import { getSkipass } from '../data-sourses/bukovel-skipass'

const router = new Router()

router
  .get('/:skipassID', async (req, res, next) => {
    try {
      const skipass = await getSkipass(req.params.skipassID)
      res.json(skipass)
    } catch (e) {
      next(e)
    }
  })

export default router
