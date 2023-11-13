import { environment } from '../environment/environment'

export const getById = async (email) => {
  const response = await fetch(environment.uriServerApiLogin + '/' + email)
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa.')
  }
  const data = await response.json()
  console.log(data)
  return data
}

export const login = async (requestLogin) => {
  const response = await fetch(environment.uriServerApiLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestLogin)
  })

  if (!response.ok) {
    // El servidor devolvió un estado que indica un error
    if (response.status === 401 || response.status === 400) {
      throw new Error('Credenciales incorrectas')
    } else {
      throw new Error('Error al iniciar sesión')
    }
  }

  // Los datos se han guardado exitosamente
  const data = await response.json()
  console.log(data)
  return data
}
