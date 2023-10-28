import { environment } from '../environment/environment'

export const login = async (requestLogin) => {
  const response = await fetch(environment.uriServerApiLogin, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Email: requestLogin.emailHeader,
      password: requestLogin.passwordHeader
    }
  })

  if (!response.ok) {
    // El servidor devolvió un estado que indica un error
    if (response.status === 401 || response.status === 400) {
      return response
    } else {
      throw new Error('Error al iniciar sesión')
    }
  }

  // Los datos se han guardado exitosamente
  return response
}
