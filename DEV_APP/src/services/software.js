import { environment } from '../environment/environment'

// Función que realiza la solicitud GET y devuelve los datos
export const create = async (formData) => {
  const response = await fetch(environment.uriServerApiSoftware, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  if (!response.ok) {
    // El servidor devolvió un estado que indica un error
    throw new Error('No se pudo guardar el formulario.')
  }

  // Los datos se han guardado exitosamente
  return response
}

export const getById = async (id) => {
  const response = await fetch(environment.uriServerApiSoftware + '/' + id)
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa.')
  }
  const data = await response.json()
  console.log(data)
  return data
}

export const update = async (id, formData) => {
  const response = await fetch((environment.uriServerApiSoftware + '/' + id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  if (!response.ok) {
    // El servidor devolvió un estado que indica un error
    throw new Error('No se pudo guardar el formulario.')
  }

  // Los datos se han guardado exitosamente
  return response
}

export const deleteSoftware = async (id) => {
  const response = await fetch((environment.uriServerApiSoftware + '/' + id), {
    method: 'DELETE'
  })

  if (!response.ok) {
    // El servidor devolvió un estado que indica un error
    throw new Error('No fue posible eliminar.')
  }

  // Los datos se han guardado exitosamente
  return response
}
