import { Router, Request, Response } from 'express'
import { ContactController } from '../controllers/contact.controller'

const router = Router()
const controller = new ContactController()

router.post('/email', async (req: Request, res: Response) => {
  await controller.registerEmail(req, res)
})

router.post('/page', async (req: Request, res: Response) => {
  await controller.registerPage(req, res)
})

router.post('/password', async (req: Request, res: Response) => {
  await controller.setPassword(req, res)
})

export default router
