import { Router } from 'express'
import { LaboratoryController } from '../controllers/laboratory.js'

export const createLaboratoryRouter = ({ laboratoryModel }) => {
  const laboratoryRouter = Router()

  const laboratoryController = new LaboratoryController({ laboratoryModel })

  laboratoryRouter.get('/', laboratoryController.getAll)

  return laboratoryRouter
}
