import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { CONFIGURATION } from '../../shared/constants'

const ConfigurationScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.text}>
        <Text  >{CONFIGURATION.information}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfigurationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.25)'
  }
})