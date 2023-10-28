import { dbPostgre } from './postgresql.js'

export class SoftwareModel {
  static async getById ({ id }) {
    let softlist = []
    await dbPostgre.query('SELECT * FROM software WHERE laboratory_id = $1', id)
      .then((result) => {
        console.log('Resultados de la consulta:', result)
        softlist = result
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error)
        return error
      })
    return softlist
  }

  static async create ({ input }) {
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('INSERT INTO software(${this:name}) VALUES(${this:csv})', input)
      .then(() => { console.log('Registro creado con éxito') })
      .catch((error) => { console.log(`Error al crear el registro: ${error}`) })
  }

  static async update ({ id, input }) {
    const softwareId = id
    const name = input.name
    const icon = input.icon
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('UPDATE software SET name = $1, icon = $2 WHERE sotfware_id = $3',
      [name, icon, softwareId])
      .then(() => { console.log('Registro actualizado con éxito') })
      .catch((error) => { console.error('Error al actualizar el registro:', error) })
  }

  static async delete ({ id }) {
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('DELETE FROM software WHERE sotfware_id = $1', [id])
      .then(() => { console.log('Registro eliminado con éxito') })
      .catch((error) => { console.error('Error al eliminar el registro:', error) })
  }
}
