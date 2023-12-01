import { environment } from '../environment/environment'

// Función que realiza la solicitud GET y devuelve los datos
export const create = async (formData) => {
  const response = await fetch(environment.uriServerApiInventory, {
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

export const getByIdInventory = async (id) => {
  const response = await fetch(environment.uriServerApiInventory + '/' + id)
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa.')
  }
  const data = await response.json()
  console.log(data)
  return data
}

export const update = async (ida, formData) => {
  const response = await fetch((environment.uriServerApiInventory + '/' + ida), {
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

export const deleteInventory = async (id) => {
  const response = await fetch((environment.uriServerApiInventory + '/' + id), {
    method: 'DELETE'
  })

  if (!response.ok) {
    // El servidor devolvió un estado que indica un error
    throw new Error('No fue posible eliminar.')
  }

  // Los datos se han guardado exitosamente
  return response
}
