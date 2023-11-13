import { validateLogin } from '../schemas/login.js'

export class LoginController {
  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const result = validateLogin(req.body)
    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json(result)
    }
    const login = await this.loginModel.login(req.body)
    if (login) return res.json(login)
    res.status(401).json({ message: 'No cuenta con permisos para acceder' })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const loginResponse = await this.loginModel.getById({ id })
    if (loginResponse) return res.json(loginResponse)
    res.status(404).json({ message: 'Error al buscar elemento' })
  }
}
