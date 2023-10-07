import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readJSON } from '../../utils.js'

const serviceAccount = readJSON('./app-lab-fisi-1cb3f3e6f246.json')

initializeApp({
  credential: serviceAccount
})

const firestore = getFirestore()

export class LaboratoryModel {
  static async getAll () {
    const laboratories = await firestore.collection('laboratories').get()
    console.log(laboratories)
    return laboratories
  }
}
