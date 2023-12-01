import { validatePartialInventory, validateInventory } from '../schemas/inventory.js'

export class InventoryController {
  constructor ({ inventoryModel }) {
    this.inventoryModel = inventoryModel
  }

  getById = async (req, res) => {
    const { id } = req.params
    const inventoryList = await this.inventoryModel.getById({ id })
    if (inventoryList) return res.json(inventoryList)
    res.status(404).json({ message: 'Error al buscar elementos' })
  }

  create = async (req, res) => {
    const result = validateInventory(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newLaboratory = await this.inventoryModel.create({ input: result.data })

    res.status(201).json(newLaboratory)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.inventoryModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Inventory no encontrado' })
    }

    return res.json({ message: 'Inventory eliminado' })
  }

  update = async (req, res) => {
    const result = validatePartialInventory(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedLaboratory = await this.inventoryModel.update({ id, input: result.data })

    return res.json(updatedLaboratory)
  }
}
