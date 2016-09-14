import { Router } from 'express'
import skipass from './skipass'

const router = new Router()

router.use('/skipass', skipass)

export default router
