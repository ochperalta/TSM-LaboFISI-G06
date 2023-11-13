import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { getById, login } from '../../services/login'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_STORAGE_USER } from '../../shared/constants'
import bcrypt from 'bcryptjs'
import ViewPassword from './ViewPassword'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [viewMessage, setViewMessage] = useState(false)
  const [messageLogin, setMessageLogin] = useState('')

  const loginUser = async () => {
    setViewMessage(false)
    const pass = password
    let saltCode = ''
    await getById(email)
      .then(codeLogin => {
        saltCode = codeLogin.code
        bcrypt.hash(pass, saltCode, (err, hash) => {
          if (err) {
            console.error('Error al inicar sesión:', err)
          } else {
            // El valor de 'hash' es el hash seguro de la contraseña
            console.log('Contraseña hasheada:', hash)

            const requestLogin = {
              login: hash,
              email
            }
            login(requestLogin)
              .then(responseLogin => {
                resetPassword()
                console.log(password)
                console.log(responseLogin[0])
                saveAsyncStorage(responseLogin[0])
                navigation.navigate('Layout')// Actualiza el estado con los datos obtenidos
              })
              .catch(error => {
                setViewMessage(true)
                console.log(error.message)
                setMessageLogin(error.message)
              })
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const saveAsyncStorage = async (data) => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_USER.username, data.username)
      await AsyncStorage.setItem(ASYNC_STORAGE_USER.email, data.email)
      console.log('Dato guardado exitosamente')
    } catch (error) {
      console.error('Error al guardar el dato: ', error)
    }
  }

  const handleTextChange = (text) => {
    setPassword(text)
  }
  const resetPassword = () => {
    setPassword('')
  }

  const navigateRegister = () => {
    setPassword('')
    navigation.navigate('RegisterScreen')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.input}
        placeholder='Correo electrónico'
        keyboardType='email-address'
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <View style={styles.containerPassword}>
        <TextInput
          style={styles.inputPassword}
          placeholder='Contraseña'
          secureTextEntry={!viewPassword}
          value={password}
          onChangeText={(text) => handleTextChange(text)}
        />
        <ViewPassword setView={(view) => setViewPassword(view)} />
      </View>
      <Pressable
        style={!password || !email ? styles.btnLoginDisabled : styles.btnLogin}
        onPress={loginUser}
        disabled={!password || !email}
      >
        <Text style={styles.loginText}>Ingresar</Text>
      </Pressable>

      <Text style={styles.questionLogin}>¿Aún no se ha registro?, Regístrese</Text>

      <Pressable
        style={styles.btnRegister}
        onPress={navigateRegister}
      >
        <Text style={styles.registerText}>Registrarse</Text>
      </Pressable>
      {viewMessage && <Text style={styles.messageLogin}>{messageLogin}</Text>}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 10,
    width: '70%'
  },
  btnLogin: {
    backgroundColor: 'blue',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    color: 'white'
  },
  loginText: {
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },
  questionLogin: {
    marginVertical: 10
  },
  btnRegister: {
    marginVertical: 10,
    padding: 10,
    width: '70%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green'
  },
  registerText: {
    textAlign: 'center',
    color: 'green'
  },
  containerPassword: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    height: 40
  },
  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10
  },
  btnViewPassword: {
    marginHorizontal: 10
  },
  messageLogin: {
    textAlign: 'center',
    color: 'red'
  },
  btnLoginDisabled: {
    backgroundColor: 'skyblue',
    marginVertical: 10,
    padding: 10,
    width: '70%',
    color: 'white'
  }
})
