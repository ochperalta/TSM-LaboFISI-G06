import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAll } from '../../services/laboratory'

const Item = ({ navigation, laboratory }) => (
  <Pressable onPress={navigation} style={styles.row}>
    <Text style={styles.titleText}>{laboratory.name}</Text>
    <Text style={laboratory.state === 'D' ? styles.available : styles.occupied}>{laboratory.state === 'D' ? 'DISPONIBLE' : 'OCUPADO'}</Text>
  </Pressable>
)

const LaboratoryScreen = ({ navigation }) => {
  const [laboratories, setLaboratories] = useState([])

  function getAllLaboratories () {
    getAll()
      .then(data => {
        setLaboratories(data) // Actualiza el estado con los datos obtenidos
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error)
      })
  }

  useEffect(() => {
    getAllLaboratories()
  }, [])

  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Lista de Laboratorios</Text>
      </View>
      <FlatList
        data={laboratories}
        numColumns={2}
        renderItem={
          ({ item }) =>
            <Item
              laboratory={item}
              navigation={() => navigation.navigate('LaboratoryDetail', { item })}
            />
        }
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default LaboratoryScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5
  },
  title: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10
  },
  row: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 7,
    paddingVertical: 5
  },
  titleText: {
    fontWeight: '500'
  },
  available: {
    marginVertical: 10,
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    fontWeight: '600'
  },
  occupied: {
    marginVertical: 10,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    fontWeight: '600'
  }
})
