import express, { json } from 'express' // require -> commonJS
import { createLaboratoryRouter } from './routes/laboratory.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'
import { createSoftwareRouter } from './routes/software.js'

// después
export const createApp = ({ laboratoryModel, softwareModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/laboratory', createLaboratoryRouter({ laboratoryModel }))

  app.use('/software', createSoftwareRouter({ softwareModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
