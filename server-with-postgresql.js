import { createApp } from './app.js'
import { LaboratoryModel } from './models/postgresql/laboratory.js'
import { SoftwareModel } from './models/postgresql/software.js'

createApp({ laboratoryModel: LaboratoryModel, softwareModel: SoftwareModel })
