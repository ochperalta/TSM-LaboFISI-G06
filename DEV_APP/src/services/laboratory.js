// Función que realiza la solicitud GET y devuelve los datos
export const getAll = async () => {
  const response = await fetch('http://192.168.1.9:1234/laboratory')
  if (!response.ok) {
    throw new Error('La solicitud no fue exitosa.')
  }
  const data = await response.json()
  console.log(data)
  return data
}
