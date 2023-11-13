import { Image, StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { deleteSoftware, getById } from '../../services/software'
import { MaterialIcons } from '@expo/vector-icons'

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     name: 'Visual Studio Code',
//     icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png'
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6a',
//     name: 'Visual Studio 2022',
//     icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Visual_Studio_Icon_2019.svg/2060px-Visual_Studio_Icon_2019.svg.png'
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d7d',
//     name: 'Android Studio',
//     icon: 'https://developer.android.com/static/studio/images/new-studio-logo-1.png'
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bh',
//     name: 'MatLab',
//     icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/667px-Matlab_Logo.png'
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     name: 'P-Seint',
//     icon: 'https://usuarios.cnba.uba.ar/gabinetes/software/PSeInt%20NUEVO/imgs/logo.png'
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d71',
//     name: 'NetBeans',
//     icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Apache_NetBeans_Logo.svg/888px-Apache_NetBeans_Logo.svg.png'
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b2',
//     name: 'Microsoft SQL Management Studio 2018',
//     icon: 'https://i.pinimg.com/736x/32/a0/3a/32a03aee0c76419ec5bde950a62883bc.jpg'
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6p',
//     name: 'Proteus',
//     icon: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Proteus_Design_Suite_Atom_Logo.png'
//   }

// ]

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

const LaboratoryDetail = ({ route, navigation }) => {
  const { item } = route.params
  const laboratory = item
  const [softwareList, setSoftwareList] = useState([])
  const [load, setload] = useState(true)
  const isFocused = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const [idDelete, setIdDelete] = useState(null)

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

  const handlerLongPress = (id) => {
    setIdDelete(id)
    setModalVisible(true)
  }

  const handlerDelete = async () => {
    setModalVisible(false)
    setload(true)
    console.log(idDelete)
    const response = await deleteSoftware(idDelete)
    if (!response.ok) {
      setload(false)
      return console.log('No fue posible guardar el formulario')
    }
    getSoftwareList()
  }

  useEffect(() => {
    if (isFocused) {
      getSoftwareList()
    }
  }, [isFocused])
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
        <Text style={laboratory.state === 'D' ? styles.available : styles.occupied}>{laboratory.state === 'D' ? 'DISPONIBLE' : 'OCUPADO'}</Text>
      </View>

      <View style={styles.title}>
        <Text>{item.location}</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Software</Text>
      </View>
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
                navigation={() => navigation.navigate('LaboratoryForm', { laboratory, item })}

              />
          }
          keyExtractor={item => item.software_id}
        />
      </View>
      <View style={styles.addButton}>
        <Pressable style={styles.floatingButton} onPress={() => { navigation.navigate('LaboratoryForm', { laboratory }) }}>
          <MaterialIcons name='add' size={30} color='white' />
        </Pressable>
      </View>
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
    justifyContent: 'center',
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
