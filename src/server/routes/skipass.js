import { Router } from 'express'

const router = new Router()

router
  .get('/:skipassID', (req, res) => {
    res.json(req.params)
  })

export default router
