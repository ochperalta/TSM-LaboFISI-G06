import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating-widget'

const RatingScreen = ({ navigation }) => {
  // Estado para almacenar la puntuación y el comentario
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  // Manejar la subida de la puntuación y el comentario al backend
  const handleSubmit = async () => {
    // try {
    //   // Realiza una solicitud al backend con la puntuación, el comentario y el UUID del usuario
    //   const userId = 'UUID_DEL_USUARIO' // Reemplaza con la lógica real para obtener el UUID del usuario
    //   const response = await fetch('URL_DEL_BACKEND/api/ratings', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       userId,
    //       rating,
    //       comment
    //     })
    //   })

    //   // Verifica la respuesta del backend
    //   if (response.ok) {
    Alert.alert('Éxito', 'Puntuación y comentario enviados con éxito.')
    // navigation.navigate('User')
    //   } else {
    //     Alert.alert('Error', 'Hubo un problema al enviar la información al backend.')
    //   }
    // } catch (error) {
    //   console.error('Error al enviar la información al backend:', error)
    // }
  }

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.ratingTitle}>¡Tu comentario es importante para nosotros, gracias!</Text>
      </View>
      <View style={styles.ratingDetail}>
        <StarRating
          maxStars={5}
          rating={rating}
          onChange={setRating}
        />

        <TextInput
          placeholder='Ingresa tu comentario'
          value={comment}
          onChangeText={(text) => setComment(text)}
          multiline
          style={{ height: 100, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 20, padding: 10 }}
        />

        {/* Botón para enviar la puntuación y el comentario */}
        <TouchableOpacity onPress={handleSubmit} style={{ width: 200, marginTop: 20, backgroundColor: '#00a6fb', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default RatingScreen

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-around',
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    height: 60
  },
  ratingTitle: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 5
  },
  ratingDetail: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 10,
    marginHorizontal: 10
  }

})
