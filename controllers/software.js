import { validatePartialSoftware, validateSoftware } from '../schemas/software.js'

export class SoftwareController {
  constructor ({ softwareModel }) {
    this.softwareModel = softwareModel
  }

  getById = async (req, res) => {
    const { id } = req.params
    const softwareList = await this.softwareModel.getById({ id })
    if (softwareList) return res.json(softwareList)
    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateSoftware(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newLaboratory = await this.softwareModel.create({ input: result.data })

    res.status(201).json(newLaboratory)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.softwareModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Software no encontrado' })
    }

    return res.json({ message: 'Software eliminado' })
  }

  update = async (req, res) => {
    const result = validatePartialSoftware(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedLaboratory = await this.softwareModel.update({ id, input: result.data })

    return res.json(updatedLaboratory)
  }
}
