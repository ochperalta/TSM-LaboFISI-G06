import { validateRegister } from '../schemas/register.js'

export class RegisterController {
  constructor ({ registerModel }) {
    this.registerModel = registerModel
  }

  register = async (req, res) => {
    const result = validateRegister(req.body)
    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json(result)
    }
    const register = await this.registerModel.register(req.body)
    const status = register ? 201 : 500
    return res.status(status).json(register)
  }
}
