import { dbPostgre } from './postgresql.js'

export class LoginModel {
  static async getById ({ id }) {
    let loginResponse
    await dbPostgre.query('SELECT code FROM accounts WHERE email = $1', id)
      .then((result) => {
        console.log('Resultados de la consulta:', result[0])
        loginResponse = result[0]
      })
      .catch((error) => {
        console.error('Error al ejecutar la consulta:', error)
        return error
      })
    return loginResponse
  }

  static async login (request) {
    const email = request.email
    const hashedPasswordFromClient = request.login
    console.log(hashedPasswordFromClient)
    let loginResponse

    await dbPostgre.any('SELECT user_id, username, email, role_name FROM accounts LEFT JOIN roles ON accounts.role_id = roles.role_id WHERE accounts.email = $1 AND accounts.password = $2', [email, hashedPasswordFromClient])
      .then((user) => {
        if (user.length === 0) {
          loginResponse = null
        } else {
          loginResponse = user
          console.log(loginResponse)
          const userId = user[0].user_id
          dbPostgre.none('UPDATE accounts SET last_login = CURRENT_TIMESTAMP AT TIME ZONE \'America/Lima\' WHERE user_id = $1', [userId])
          console.log('Usuario autenticado')
        }
      })
      .catch((error) => {
        console.log(error)
        return error
      })

    return loginResponse ?? null
  }
}
