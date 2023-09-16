import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'LAB - 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6a',
    title: 'LAB - 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7d',
    title: 'LAB - 3',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bh',
    title: 'LAB - 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'LAB - 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'LAB - 3',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b2',
    title: 'LAB - 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6p',
    title: 'LAB - 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'LAB - 3',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b8',
    title: 'LAB - 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6w',
    title: 'LAB - 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'LAB - 3',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b5',
    title: 'LAB - 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6q',
    title: 'LAB - 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7a',
    title: 'LAB - 3',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2836',
    title: 'LAB - 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd94aa97f63',
    title: 'LAB - 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145d71e29d72',
    title: 'LAB - 3',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.state}>DISPONIBLE</Text>
  </View>
);

const Home = () => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.containerList}
        data={DATA}
        numColumns={2}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      >
      </FlatList>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
  },
  item: {
    width: '45%',
    height: 80,
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
  }
})