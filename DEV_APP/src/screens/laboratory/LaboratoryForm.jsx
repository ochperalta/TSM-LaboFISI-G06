import { StyleSheet, Text, View, Image, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { create, update } from '../../services/software'

const LaboratoryForm = ({ route, navigation }) => {
  const { laboratory, item } = route?.params
  const defaultIcon = 'https://cdn-icons-png.flaticon.com/512/8759/8759045.png'
  const [customIcon, setCustomIcon] = useState('')
  const [name, setName] = useState(item?.name ?? '')
  const [icon, setIcon] = useState(item?.icon ?? '')
  const [load, setload] = useState(false)

  async function handleSave () {
    setload(true)
    try {
      let formData
      if (!icon) {
        setIcon(defaultIcon)
        formData = { name, icon: defaultIcon, laboratoryId: laboratory.id }
      } else {
        setCustomIcon(icon)
        formData = { name, icon, laboratoryId: laboratory.id }
      }
      let response
      // Llama a la función saveFormData para guardar los datos
      if (item) {
        response = await update(item.id, formData)
        console.log('Formulario guardado')
      } else {
        response = await create(formData)
        console.log('Formulario guardado')
      }
      if (!response.ok) {
        return console.log('No fue posible guardar el formulario')
      }
      // const labUpdate = await getByIdLaboratory(item.laboratoryId)
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
        <Text style={styles.softwareTitle}>{name || 'Nuevo Software'}</Text>
        <Image
          style={styles.softwareIcon}
          source={{
            uri: customIcon || defaultIcon
          }}
        />
      </View>
      <View style={styles.softwareDetail}>
        <Text style={styles.softwareNameLabel}>Nombre</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setName(value)} value={name} />
        <Text style={styles.softwareNameLabel}>Ruta de ícono</Text>
        <TextInput style={styles.softwareName} onChangeText={(value) => setIcon(value)} value={icon} />
      </View>
      {load && <ActivityIndicator />}
      {
        name &&
          <View style={styles.addButton}>
            <Pressable style={styles.floatingButton} onPress={handleSave}>
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
