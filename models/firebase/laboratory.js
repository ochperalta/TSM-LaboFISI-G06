import { db } from './firebase.js'

export class LaboratoryModel {
  static async getAll () {
    const labList = []
    const queryLaboratories = await db.collection('laboratories').get()
    queryLaboratories.forEach(l => {
      labList.push({
        id: l.id,
        name: l.data().name,
        state: l.data().state,
        location: l.data().location
      })
    })
    return labList
  }
}
