import { environment } from '../environment/environment'

export const getAll = async () => {
  const response = await fetch(environment.uriServerApiSchedule)
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa.')
  }
  const data = await response.json()
  console.log(data)
  return data
}
