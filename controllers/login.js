import { validateLogin } from '../schemas/login.js'

export class LoginController {
  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const { email, password } = req.headers
    const request = {
      email,
      password
    }
    const result = validateLogin(request)
    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json(result)
    }
    const login = await this.loginModel.login(email, password)
    if (login) return res.json(login)
    res.status(401).json({ message: 'No cuenta con permisos para acceder' })
  }
}
