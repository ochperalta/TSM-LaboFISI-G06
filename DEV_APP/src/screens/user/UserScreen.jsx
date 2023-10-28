import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const UserScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Información de Usuario</Text>
      </View>
      <View style={styles.containerUser}>
        <Text style={styles.label}>Martin Perez Duarte</Text>
        <Text style={styles.label}>mperezd@unmsm.edu.pe</Text>
        <Pressable
          onPress={() => navigation.navigate('LoginScreen')}
          style={{ width: '100%' }}
        >
          <Text style={styles.label}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 5,
    marginHorizontal: 5,
    paddingVertical: 10
  },
  titleText: {
    fontWeight: '500'
  },
  containerUser: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: 5,
    marginHorizontal: 5
  },
  label: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: 1
  }
})
