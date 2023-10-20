import { db } from './firebase.js'

export class SoftwareModel {
  static async getById ({ id }) {
    const softlist = []
    const softRef = db.collection('software').where('laboratoryId', '==', id)
    const softDocs = await softRef.get()
    softDocs.forEach(s => {
      softlist.push({
        id: s.id,
        name: s.data().name,
        icon: s.data().icon,
        laboratoryId: s.data().laboratoryId
      })
    })
    return softlist
  }

  static async create ({ input }) {
    console.log(input)
    await db.collection('software').add(input)
      .catch((error) => { console.log(`Ocurrio un error: ${error}`) })
  }

  static async update ({ id, input }) {
    const softwareRef = db.collection('software').doc(id)

    await softwareRef.set(input, { merge: true })
      .catch((error) => { console.log(`Ocurrio un error: ${error}`) })
  }

  static async delete ({ id }) {
    await db.collection('software').doc(id).delete()
      .catch((error) => { console.log(`Ocurrio un error: ${error}`) })
  }
}
