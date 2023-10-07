import { Router } from 'express'
import { LaboratoryController } from '../controllers/laboratory.js'

export const createLaboratoryRouter = ({ laboratoryModel }) => {
  const laboratoryRouter = Router()

  const laboratoryController = new LaboratoryController({ laboratoryModel })

  laboratoryRouter.get('/', laboratoryController.getAll)
  // laboratoryRouter.post('/', laboratoryController.create)

  // laboratoryRouter.get('/:id', laboratoryController.getById)
  // laboratoryRouter.delete('/:id', laboratoryController.delete)
  // laboratoryRouter.patch('/:id', laboratoryController.update)

  return laboratoryRouter
}
