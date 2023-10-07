import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'LAB - 1',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6a',
//     title: 'LAB - 2',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d7d',
//     title: 'LAB - 3',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bh',
//     title: 'LAB - 1',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'LAB - 2',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d71',
//     title: 'LAB - 3',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b2',
//     title: 'LAB - 1',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6p',
//     title: 'LAB - 2',
//   }
// ];

const Item = ({ navigation, item }) => (
  <Pressable onPress={navigation} style={styles.row}>
    <Text style={styles.titleText}>{item.name}</Text>
    <Text style={item.state === 'DISPONIBLE' ? styles.available : styles.occupied}>{item.state}</Text>
  </Pressable>
)

const LaboratoryScreen = ({ navigation }) => {
  const [laboratories, setLaboratories] = useState([])

  useEffect(() => {
    // Hacer una solicitud GET a la API
    fetch('http://192.168.1.11:1234/laboratory')
      .then(res => res.json())
      .then(laboratories => {
        setLaboratories(laboratories)
        console.log(laboratories)
      })
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
              item={item}
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
