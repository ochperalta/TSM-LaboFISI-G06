import express, { json } from 'express' // require -> commonJS
import { createLaboratoryRouter } from './routes/laboratory.js'
// import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'
import { createSoftwareRouter } from './routes/software.js'
import cors from 'cors'
import { createLoginRouter } from './routes/login.js'
import { createRegisterRouter } from './routes/register.js'
import { createInventoryRouter } from './routes/inventory.js'
import { createScheduleRouter } from './routes/schedule.js'

// después
export const createApp = ({
  laboratoryModel,
  softwareModel,
  loginModel,
  registerModel,
  inventoryModel,
  scheduleModel
}) => {
  const app = express()

  app.use(json())
  // app.use(corsMiddleware())
  app.use(cors())

  app.disable('x-powered-by')

  app.use('/laboratory', createLaboratoryRouter({ laboratoryModel }))

  app.use('/software', createSoftwareRouter({ softwareModel }))

  app.use('/login', createLoginRouter({ loginModel }))

  app.use('/register', createRegisterRouter({ registerModel }))

  app.use('/inventory', createInventoryRouter({ inventoryModel }))

  app.use('/schedule', createScheduleRouter({ scheduleModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
