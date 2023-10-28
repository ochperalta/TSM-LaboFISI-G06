import { dbPostgre } from './postgresql.js'

export class LoginModel {
  static async login (email, password) {
    let login = []
    await dbPostgre.any('SELECT * FROM accounts WHERE email = $1 AND password = $2', [email, password])
      .then((user) => {
        if (user.length === 0) {
          login = null
        } else {
          const userId = user[0].user_id
          dbPostgre.none('UPDATE accounts SET last_login = CURRENT_TIMESTAMP AT TIME ZONE \'America/Lima\' WHERE user_id = $1', [userId])
            .then(() => {
              dbPostgre.any('SELECT * FROM accounts WHERE email = $1 AND password = $2', [email, password])
                .then((response) => {
                  console.log(`Usuario autenticado (${response[0].last_login})`)
                  login = response
                })
            })
        }
      })
      .catch((error) => {
        console.log(error)
        return error
      })
    return login ?? null
  }
}
