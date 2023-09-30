import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import { USER_OPTIONS } from '../../shared/constants'

const UserOptionsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.text}>
        <Text  >{USER_OPTIONS.logout}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserOptionsScreen

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