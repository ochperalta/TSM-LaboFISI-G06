import { Router } from 'express'
import { InventoryController } from '../controllers/inventory.js'

export const createInventoryRouter = ({ inventoryModel }) => {
  const inventoryRouter = Router()

  const inventoryController = new InventoryController({ inventoryModel })

  inventoryRouter.get('/:id', inventoryController.getById)
  inventoryRouter.post('/', inventoryController.create)
  inventoryRouter.delete('/:id', inventoryController.delete)
  inventoryRouter.patch('/:id', inventoryController.update)

  return inventoryRouter
}
