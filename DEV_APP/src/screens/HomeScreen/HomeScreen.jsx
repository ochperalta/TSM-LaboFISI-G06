import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TopAppBar from './TopAppBar';
import Reservations from './Reservations';
import { useState, useRef, useEffect } from 'react';
import Home from './Home';
import Schedules from './Schedules';
import BottomAppBar from './BottomAppBar';

const HomeScreen = ({ navigation }) => {
  const [optionVisible, setOptionVisible] = useState(1)
  const visibleComponent = () => {
    switch (optionVisible) {
      case 1:
        return <Home></Home>
      case 2:
        return <Schedules></Schedules>
      case 3:
        return <Reservations></Reservations>
      default:
        return <Home></Home>
    }
  }
  return (
    <>
      <View style={styles.container}>
        <TopAppBar
          navigationConfiguration={() => navigation.navigate('Configuration')}
          navigationUserOption={() => navigation.navigate('UserOptions')}
        ></TopAppBar>
        <View style={styles.containerOption}>
          {visibleComponent()}
          <StatusBar style="auto" />
        </View>
        <BottomAppBar style={styles.containerBottom} onButtonPress={(option) => setOptionVisible(option)} ></BottomAppBar>
      </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  containerOption: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerBottom: {
    position: 'absolute',
    bottom: 0,
  }
});