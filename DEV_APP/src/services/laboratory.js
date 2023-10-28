import { environment } from '../environment/environment'

// Función que realiza la solicitud GET y devuelve los datos
export const getAll = async () => {
  const response = await fetch(environment.uriServerApiLaboratory)
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa.')
  }
  const data = await response.json()
  console.log(data)
  return data
}
