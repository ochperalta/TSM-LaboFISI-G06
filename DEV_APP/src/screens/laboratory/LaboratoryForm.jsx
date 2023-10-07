import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const LaboratoryForm = ({ route, navigation }) => {
  const { item } = route?.params ?? { item: null }
  const defaultIcon = 'https://cdn-icons-png.flaticon.com/512/8759/8759045.png'
  const [name, setName] = useState(item?.name ?? null)
  const [icon, setIcon] = useState(item?.icon ?? null)

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.softwareTitle}>{name || 'Nuevo Software'}</Text>
        <Image
          style={styles.softwareIcon}
          source={{
            uri: icon || defaultIcon
          }}
        />
      </View>
      <View style={styles.softwareDetail}>
        <Text style={styles.softwareNameLabel}>Nombre</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setName(value)} value={name} />
        <Text style={styles.softwareNameLabel}>Ruta de ícono</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setIcon(value)} value={icon} />
      </View>
      {
        name &&
          <View style={styles.addButton}>
            <Pressable style={styles.floatingButton} onPress={() => { navigation.navigate('LaboratoryDetail') }}>
              <MaterialIcons name='save' size={30} color='white' />
            </Pressable>
          </View>
      }

    </>
  )
}

export default LaboratoryForm

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-around',
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 10,
    paddingVertical: 10,
    height: 120
  },
  softwareTitle: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 5
  },
  softwareNameLabel: {
    textAlign: 'left',
    fontWeight: '400',
    marginLeft: 15,
    fontSize: 12
  },
  softwareName: {
    textAlign: 'left',
    paddingHorizontal: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  softwareIcon: {
    height: 50,
    width: 50
  },
  softwareDetail: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 10,
    marginHorizontal: 10
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 8
  },
  floatingButton: {
    width: 50,
    height: 50,
    backgroundColor: '#00a6fb', // Color del botón
    borderRadius: 10, // Hace que el botón sea circular
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    color: 'white', // Color del texto del botón
    fontWeight: '500'
  }
})
