import { dbPostgre } from './postgresql.js'

export class RegisterModel {
  static async register (request) {
    const login = request.login.split(request.code)
    const salt = login[0]
    const password = login[1]
    let roleId = ''
    let created = false

    await dbPostgre.any('SELECT role_id FROM roles WHERE role_name = $1', request.role)
      .then((result) => {
        console.log('Resultados de la consulta:', result)
        roleId = result[0].role_id
      })
      .catch((error) => { console.log(`Error al crear el registro: ${error}`) })

    const account = {
      username: request.username,
      email: request.email,
      password,
      code: salt,
      role_id: roleId
    }
    // eslint-disable-next-line no-template-curly-in-string
    await dbPostgre.none('INSERT INTO accounts(${this:name}) VALUES(${this:csv})', account)
      .then(() => {
        created = true
        console.log('Registro creado con éxito')
      })
      .catch((error) => { console.log(`Error al crear el registro: ${error}`) })
    return created
  }
}
