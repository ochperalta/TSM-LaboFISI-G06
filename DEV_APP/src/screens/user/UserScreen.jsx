import { StyleSheet, Text, View, Pressable, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ASYNC_STORAGE_USER, USER_OPTIONS } from '../../shared/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const navigation = useNavigation()
  const [role, setRole] = useState('user')

  useEffect(() => {
    getAsyncStorage()
    const handleBackPress = () => {
      const currentScreen = navigation.isFocused()
      console.log(currentScreen)
      if (currentScreen) {
        return true
      }

      return false
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => backHandler.remove()
  }, [navigation])

  const getAsyncStorage = async () => {
    try {
      setUsername(await AsyncStorage.getItem(ASYNC_STORAGE_USER.username) ?? '')
      setEmail(await AsyncStorage.getItem(ASYNC_STORAGE_USER.email) ?? '')
      setRole(await AsyncStorage.getItem(ASYNC_STORAGE_USER.role) ?? '')
    } catch (error) {
      console.error('Error al recuperar el dato: ', error)
    }
  }

  const handlerNavigateLogin = async () => {
    await AsyncStorage.removeItem(ASYNC_STORAGE_USER.username)
    await AsyncStorage.removeItem(ASYNC_STORAGE_USER.email)
    navigation.navigate('LoginScreen')
  }

  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Información de Usuario</Text>
      </View>
      <View style={styles.containerUser}>
        <Text style={styles.label}>Usuario: {username}</Text>
        <Text style={styles.label}>Email: {email}</Text>
        {role === 'user' &&
          <Pressable
            onPress={() => { navigation.navigate('Rating') }}
            style={{ width: '100%' }}
          >
            <Text style={[styles.label, styles.logout]}>{USER_OPTIONS.rating}</Text>
          </Pressable>}
        <Pressable
          onPress={handlerNavigateLogin}
          style={{ width: '100%' }}
        >
          <Text style={[styles.label, styles.logout]}>{USER_OPTIONS.logout}</Text>
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
  },
  logout: {
    fontWeight: '500'
  }
})
