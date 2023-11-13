import { Router } from 'express'
import { RegisterController } from '../controllers/register.js'

export const createRegisterRouter = ({ registerModel }) => {
  const registerRouter = Router()

  const registerController = new RegisterController({ registerModel })

  registerRouter.post('/', registerController.register)

  return registerRouter
}
