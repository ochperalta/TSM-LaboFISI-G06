import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScheduleScreen = () => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Horario</Text>
      </View>
    </View>
  )
}

export default ScheduleScreen

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10
  },
  titleText: {
    fontWeight: '500'
  }
})
