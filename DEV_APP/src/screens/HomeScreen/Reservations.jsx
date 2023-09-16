import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'LAB - 1',
    assigature: 'Asignatura A',
    schedule: 'Martes 10:00 a 14:00'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6a',
    title: 'LAB - 2',
    assigature: 'Asignatura B',
    schedule: 'Miércoles 10:00 a 14:00'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7d',
    title: 'LAB - 3',
    assigature: 'Asignatura C',
    schedule: 'Jueves 10:00 a 14:00'
  }
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.details}>CURSO: {item.assigature} </Text>
    <Text style={styles.details}>HORARIO: {item.schedule} </Text>
  </View>
);

const Reservations = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.containerList}
        data={DATA}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      >
      </FlatList>
    </View>
  )
}

export default Reservations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
  },
  item: {
    width: '95%',
    height: 90,
    paddingTop:5,
    backgroundColor: '#ffffff',
    marginVertical: 15,
    marginHorizontal: 10,
    elevation: 5
  },
  title: {
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  state:{
    marginTop:5,
    paddingVertical:5,
    marginHorizontal:10,
    backgroundColor:'rgba(34,174,73,1)',
    borderRadius:5,
    textAlign:'center',
    fontSize: 15,
    fontWeight: 'bold',
    color:'white'
  },
  details:{
    textAlign:'left',
    fontSize: 18,
    fontWeight: 'bold',
    color:'rgba(0,0,0,0.50)'
  }
})