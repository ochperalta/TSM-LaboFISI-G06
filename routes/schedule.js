import { Router } from 'express'
import { ScheduleController } from '../controllers/schedule.js'

export const createScheduleRouter = ({ scheduleModel }) => {
  const scheduleRouter = Router()

  const scheduleController = new ScheduleController({ scheduleModel })

  scheduleRouter.get('/', scheduleController.getAll)
  scheduleRouter.post('/', scheduleController.create)
  scheduleRouter.delete('/:id', scheduleController.delete)
  scheduleRouter.patch('/:id', scheduleController.update)

  return scheduleRouter
}
