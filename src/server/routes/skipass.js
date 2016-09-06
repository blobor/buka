import { Router } from 'express'

import { wrapAsync } from '../utils/express-promise-handle'
import { getSkipass } from '../data-sourses/bukovel-shop/bukovel-skipass'

const router = new Router()

router
  .get('/:skipassID', wrapAsync(async (req, res, next) => {
    const skipass = await getSkipass(req.params.skipassID)
    res.json(skipass)
  }))

export default router
