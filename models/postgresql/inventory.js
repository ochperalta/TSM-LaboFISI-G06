import { dbPostgre } from './postgresql.js'

export class InventoryModel {
  static async getById ({ id }) {
    let inventoryListResponse = []
    await dbPostgre.query('SELECT * FROM components WHERE laboratory_id = $1 AND state = $2', [id, 'A'])
      .then((result) => {
        console.log('Resultados de la consulta:', result)
        inventoryListResponse = result
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error)
        return error
      })
    return inventoryListResponse
  }

  static async create ({ input }) {
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('INSERT INTO components(${this:name}) VALUES(${this:csv})', input)
      .then(() => { console.log('Registro creado con éxito') })
      .catch((error) => { console.log(`Error al crear el registro: ${error}`) })
  }

  static async update ({ id, input }) {
    const inventoryId = id
    const name = input.name
    const code = input.code
    const description = input.description
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('UPDATE components SET name = $1, code = $2, description = $3 WHERE component_id = $4',
      [name, code, description, inventoryId])
      .then(() => { console.log('Registro actualizado con éxito') })
      .catch((error) => { console.error('Error al actualizar el registro:', error) })
  }

  static async delete ({ id }) {
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('UPDATE components SET state = $1 WHERE component_id = $2', ['I', id])
      .then(() => { console.log('Registro eliminado con éxito') })
      .catch((error) => { console.error('Error al eliminar el registro:', error) })
  }
}
