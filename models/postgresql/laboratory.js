import { dbPostgre } from './postgresql.js'

export class LaboratoryModel {
  static async getAll () {
    let labList = []
    await dbPostgre.any('SELECT * FROM laboratory')
      .then(function (data) {
        console.log(data)
        labList = data
      })
      .catch(function (error) {
        console.log(error)
        return error
      })
    return labList
  }
}
