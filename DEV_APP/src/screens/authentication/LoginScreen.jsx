import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { login } from '../../services/login'
import { Ionicons } from '@expo/vector-icons'

const ViewPassword = ({ setView }) => {
  const [viewPassword, setViewPassword] = useState(false)

  const changeBtn = (flag) => {
    setViewPassword(flag)
    setView(flag)
  }
  return (
    <Pressable
      style={styles.btnViewPassword}
      title={viewPassword ? 'Ocultar' : 'Mostrar'}
      onPress={() => changeBtn(!viewPassword)}
    >
      <Ionicons
        name={viewPassword ? 'eye-off-outline' : 'eye-outline'}
        size={24}
        color='gray'
      />
    </Pressable>
  )
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [viewMessage, setViewMessage] = useState(false)
  const [messageLogin, setMessageLogin] = useState('')

  const Login = async () => {
    setViewMessage(false)
    const pass = password
    const requestLogin = {
      emailHeader: email,
      passwordHeader: pass
    }

    const responseLogin = await login(requestLogin)
    if (responseLogin.ok) {
      resetPassword()
      console.log(password)
      navigation.navigate('Layout')
    } else if (responseLogin.status === 401 || responseLogin.status === 400) {
      setViewMessage(true)
      setMessageLogin('Credenciales incorrectas')
    } else {
      setViewMessage(true)
      setMessageLogin('Error al iniciar sesión')
    }
  }

  const handleTextChange = (text) => {
    setPassword(text)
  }
  const resetPassword = () => {
    setPassword('')
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
        onPress={Login}
        disabled={!password || !email}
      >
        <Text style={styles.loginText}>Ingresar</Text>
      </Pressable>

      <Text style={styles.questionLogin}>¿Aún no se ha registro?, Regístrese</Text>

      <Pressable
        style={styles.btnRegister}
        onPress={() => navigation.navigate('RegisterScreen')}
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
