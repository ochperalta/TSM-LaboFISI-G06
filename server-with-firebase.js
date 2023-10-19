import { createApp } from './app.js'
import { LaboratoryModel } from './models/firebase/laboratory.js'
import { SoftwareModel } from './models/firebase/software.js'

createApp({ laboratoryModel: LaboratoryModel, softwareModel: SoftwareModel })
