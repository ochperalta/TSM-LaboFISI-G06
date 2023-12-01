import { Image, StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { deleteSoftware, getById } from '../../services/software'
import { deleteInventory, getByIdInventory } from '../../services/inventory'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_STORAGE_USER } from '../../shared/constants'

const Item = ({ navigation, item, longPress }) => (
  <Pressable
    style={styles.row}
    // eslint-disable-next-line no-undef
    onLongPress={longPress}
    onPress={navigation}
  >
    <Text style={styles.softwareName}>{item.name}</Text>
    <Image
      style={styles.softwareIcon}
      source={{
        uri: item.icon
      }}
    />
  </Pressable>
)

const ItemComponent = ({ navigation, item, longPress }) => (
  <Pressable
    style={styles.row}
    // eslint-disable-next-line no-undef
    onLongPress={longPress}
    onPress={navigation}
  >
    <Text style={styles.softwareName}>{item.name}</Text>
    <Text style={{ width: '100%', textAlign: 'left', paddingHorizontal: 5 }}>Código: {item.code}</Text>
    <Text style={{ width: '100%', textAlign: 'left', paddingHorizontal: 5 }}>Descripción: {item.description}</Text>
  </Pressable>
)

const LaboratoryDetail = ({ route, navigation }) => {
  const { item } = route.params
  const laboratory = item
  const [softwareList, setSoftwareList] = useState([])
  const [inventoryList, setInventoryList] = useState([])
  const [load, setload] = useState(true)
  const isFocused = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const [idDelete, setIdDelete] = useState(null)
  const [isSoftware, setIsSoftware] = useState(true)
  const [role, setRole] = useState('user')

  function getSoftwareList () {
    getById(item.laboratory_id)
      .then(data => {
        setSoftwareList(data) // Actualiza el estado con los datos obtenidos
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error)
      })
      .finally(setload(false))
  }

  const getInventoryList = () => {
    getByIdInventory(item.laboratory_id)
      .then(data => {
        setInventoryList(data) // Actualiza el estado con los datos obtenidos
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error)
      })
      .finally(setload(false))
  }

  const getAsyncStorage = async () => {
    try {
      setRole(await AsyncStorage.getItem(ASYNC_STORAGE_USER.role))
    } catch (error) {
      console.error('Error al recuperar el dato: ', error)
    }
  }

  const handlerLongPress = (id) => {
    if (role === 'support') {
      setIdDelete(id)
      setModalVisible(true)
    }
  }

  const handlerNavigateForm = () => {
    if (role === 'support') {
      if (isSoftware) {
        navigation.navigate('LaboratoryForm', { laboratory, item })
      } else {
        navigation.navigate('InventoryForm', { laboratory, item })
      }
    }
  }

  const handlerDelete = async () => {
    setModalVisible(false)
    setload(true)
    console.log(idDelete)
    if (isSoftware) {
      const response = await deleteSoftware(idDelete)
      if (!response.ok) {
        setload(false)
        return console.log('No fue realizar la operación')
      }
      getSoftwareList()
    } else {
      const response = await deleteInventory(idDelete)
      if (!response.ok) {
        setload(false)
        return console.log('No fue realizar la operación')
      }
      getInventoryList()
    }
  }

  useEffect(() => {
    if (isFocused) {
      getSoftwareList()
      getInventoryList()
      getAsyncStorage()
    }
  }, [isFocused])

  const handlerAdd = () => {
    if (isSoftware) {
      navigation.navigate('LaboratoryForm', { laboratory })
    } else {
      navigation.navigate('InventoryForm', { laboratory })
    }
  }

  return (
    <>
      <Modal
        animationType='none'
        transparent
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Eliminar registro</Text>
            <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={handlerDelete}
              >
                <Text style={styles.textStyle}>Si</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.title}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text style={laboratory.state === 'A' ? styles.available : styles.occupied}>{laboratory.state === 'A' ? 'DISPONIBLE' : 'NO DISPONIBLE'}</Text>
      </View>

      <View style={styles.title}>
        <Text>{item.location}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', paddingHorizontal: 10 }}>
        <Pressable
          style={{ flex: 1, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: isSoftware ? 'blue' : 'whitesmoke', height: 30 }}
          onPress={() => { setIsSoftware(true) }}
        >
          <Text style={{ color: isSoftware ? 'white' : 'rgba(0,0,0,0.4)', fontWeight: '600' }}>Software</Text>
        </Pressable>

        <Pressable
          style={{ flex: 1, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: !isSoftware ? 'blue' : 'whitesmoke', height: 30, color: 'white' }}
          onPress={() => { setIsSoftware(false) }}
        >
          <Text style={{ color: !isSoftware ? 'white' : 'rgba(0,0,0,0.4)', fontWeight: '600' }}>Inventario</Text>
        </Pressable>
      </View>
      {isSoftware &&
        <View style={styles.softwareContainer}>
          {load && <ActivityIndicator />}
          <FlatList
            data={softwareList}
            numColumns={2}
            renderItem={
              ({ item }) =>
                <Item
                  item={item}
                  longPress={() => handlerLongPress(item.software_id)}
                  navigation={handlerNavigateForm}

                />
            }
            keyExtractor={item => item.software_id}
          />
        </View>}
      {!isSoftware &&
        <View style={styles.softwareContainer}>
          {load && <ActivityIndicator />}
          <FlatList
            data={inventoryList}
            numColumns={1}
            renderItem={
              ({ item }) =>
                <ItemComponent
                  item={item}
                  longPress={() => handlerLongPress(item.component_id)}
                  navigation={handlerNavigateForm}

                />
            }
            keyExtractor={item => item.component_id}
          />
        </View>}
      {role === 'support' &&
        <View style={styles.addButton}>
          <Pressable style={styles.floatingButton} onPress={handlerAdd}>
            <MaterialIcons name='add' size={30} color='white' />
          </Pressable>
        </View>}
    </>
  )
}

export default LaboratoryDetail

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 10,
    paddingVertical: 10
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
  },
  softwareContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    marginHorizontal: 10
  },
  row: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    alignContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 7,
    elevation: 3,
    height: 130
  },
  softwareName: {
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 5
  },
  softwareIcon: {
    height: 50,
    width: 50
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: 200,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 50,
    marginHorizontal: 10
  },
  buttonDelete: {
    backgroundColor: 'red'
  },
  buttonCancel: {
    backgroundColor: '#00a6fb'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
