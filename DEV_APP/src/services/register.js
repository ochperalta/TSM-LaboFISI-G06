import { environment } from '../environment/environment'

export const register = async (requestRegister) => {
  const response = await fetch(environment.uriServerApiRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestRegister)
  })

  if (!response.ok) {
    const errorMessage = await response.json()
    // El servidor devolvió un estado que indica un error
    if (response.status === 401 || response.status === 400) {
      throw new Error('Formato incorrecto')
    } else {
      throw new Error(errorMessage.message)
    }
  }

  // Los datos se han guardado exitosamente
  const data = await response.json()
  console.log(data)
  return data
}
