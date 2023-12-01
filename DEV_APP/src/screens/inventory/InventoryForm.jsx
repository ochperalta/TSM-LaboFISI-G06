import { StyleSheet, Text, View, TextInput, ActivityIndicator, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { create, update } from '../../services/inventory'

const InventoryForm = ({ route, navigation }) => {
  const { laboratory, item } = route?.params
  const [name, setName] = useState(item?.name ?? '')
  const [code, setCode] = useState(item?.code ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [load, setload] = useState(false)
  async function handleSave () {
    setload(true)
    console.log(laboratory)
    try {
      const formData = { name, code, description, laboratory_id: laboratory.laboratory_id }
      let response
      if (item) {
        response = await update(item.component_id, formData)
        console.log('Formulario guardado')
      } else {
        response = await create(formData)
        console.log('Formulario guardado')
      }
      if (!response.ok) {
        return console.log('No fue posible guardar el formulario')
      }
      navigation.navigate('LaboratoryDetail', { item: laboratory })
    } catch (error) {
      console.error('Error al guardar el formulario:', error)
    } finally {
      setload(true)
    }
  }
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.softwareTitle}>Inventario {laboratory.name}</Text>
      </View>
      <View style={styles.softwareDetail}>
        <Text style={styles.softwareNameLabel}>Nombre</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setName(value)} value={name} />
        <Text style={styles.softwareNameLabel}>Código</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setCode(value)} value={code} />
        <Text style={styles.softwareNameLabel}>Descripción</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setDescription(value)} value={description} />
      </View>
      {load && <ActivityIndicator />}
      {
        name && code && description &&
          <View style={styles.addButton}>
            <Pressable style={styles.floatingButton} onPress={handleSave}>
              <MaterialIcons name='save' size={30} color='white' />
            </Pressable>
          </View>
      }
    </>
  )
}

export default InventoryForm

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
  softwareTitle: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 5
  },
  softwareDetail: {
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 10,
    marginHorizontal: 10
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
  }

})
