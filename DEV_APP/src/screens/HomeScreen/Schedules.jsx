import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'

const Schedules = () => {

  const [selectedDate, setSelectedDate] = useState('');
  return (
    <View>
      
    </View>
  )
}

export default Schedules

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el ScrollView crezca en altura según el contenido
  },
  contenido: {
    width: 1000, // Ancho del contenido para habilitar el desplazamiento horizontal
    padding: 20,
    backgroundColor: 'lightgray', // Cambia el color de fondo según tus preferencias
  },
});