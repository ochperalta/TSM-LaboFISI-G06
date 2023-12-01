import { validatePartialSchedule, validateSchedule } from '../schemas/schedule.js'

export class ScheduleController {
  constructor ({ scheduleModel }) {
    this.scheduleModel = scheduleModel
  }

  getAll = async (req, res) => {
    const scheduleList = await this.scheduleModel.getAll()
    if (scheduleList) return res.json(scheduleList)
    res.status(404).json({ message: 'Error al buscar elementos' })
  }

  create = async (req, res) => {
    const result = validateSchedule(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newLaboratory = await this.scheduleModel.create({ input: result.data })

    res.status(201).json(newLaboratory)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.scheduleModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Schedule no encontrado' })
    }

    return res.json({ message: 'Schedule eliminado' })
  }

  update = async (req, res) => {
    const result = validatePartialSchedule(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedLaboratory = await this.scheduleModel.update({ id, input: result.data })

    return res.json(updatedLaboratory)
  }
}
