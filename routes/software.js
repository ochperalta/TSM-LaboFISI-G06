import { Router } from 'express'
import { SoftwareController } from '../controllers/software.js'

export const createSoftwareRouter = ({ softwareModel }) => {
  const softwareRouter = Router()

  const softwareController = new SoftwareController({ softwareModel })

  softwareRouter.get('/:id', softwareController.getById)
  softwareRouter.post('/', softwareController.create)
  softwareRouter.delete('/:id', softwareController.delete)
  softwareRouter.patch('/:id', softwareController.update)

  return softwareRouter
}
