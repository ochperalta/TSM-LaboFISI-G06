import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import ViewPassword from './ViewPassword'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { register } from '../../services/register'

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [viewRepeatPassword, setViewRepeatPassword] = useState(false)
  const [viewMessage, setViewMessage] = useState(false)
  const [messageLogin, setMessageLogin] = useState('')
  const [isUser, setIsUser] = useState(true)

  const registerUser = () => {
    setViewMessage(false)

    const uuid = uuidv4()
    const pass = password

    if (password !== repeatPassword) {
      setViewMessage(true)
      setMessageLogin('Las contraseñas no coinciden')
      return
    }

    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          console.error('Error al generar el hash de la contraseña:', err)
        } else {
          // El valor de 'hash' es el hash seguro de la contraseña
          console.log('Contraseña hasheada:', hash)

          const requestRegister = {
            login: salt + uuid + hash,
            email,
            username,
            role: isUser ? 'user' : 'support',
            code: uuid
          }
          console.log(requestRegister)
          register(requestRegister)
            .then(() => {
              resetPassword()
              navigation.navigate('LoginScreen')// Actualiza el estado con los datos obtenidos
            })
            .catch(error => {
              setViewMessage(true)
              console.log(error.message)
              setMessageLogin(error.message)
            })
        }
      })
    })
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
        placeholder='Nombre de usuario'
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
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
      <View style={styles.containerPassword}>
        <TextInput
          style={styles.inputPassword}
          placeholder='Repetir contraseña'
          secureTextEntry={!viewRepeatPassword}
          value={repeatPassword}
          onChangeText={(value) => setRepeatPassword(value)}
        />
        <ViewPassword setView={(view) => setViewRepeatPassword(view)} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%' }}>
        <Pressable
          style={{ flex: 1, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: isUser ? 'blue' : 'whitesmoke', height: 30 }}
          onPress={() => { setIsUser(true) }}
        >
          <Text style={{ color: isUser ? 'white' : 'rgba(0,0,0,0.4)' }}>Usuario</Text>
        </Pressable>

        <Pressable
          style={{ flex: 1, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: !isUser ? 'blue' : 'whitesmoke', height: 30, color: 'white' }}
          onPress={() => { setIsUser(false) }}
        >
          <Text style={{ color: !isUser ? 'white' : 'rgba(0,0,0,0.4)' }}>Soporte</Text>
        </Pressable>
      </View>
      <Pressable
        style={!password || !email || !repeatPassword || !username ? styles.btnLoginDisabled : styles.btnLogin}
        onPress={registerUser}
        disabled={!password || !email || !repeatPassword || !username}
      >
        <Text style={styles.loginText}>Registrarse</Text>
      </Pressable>

      <Text style={styles.questionLogin}>¿Ya tiene una cuenta?, Ingrese</Text>

      <Pressable
        style={styles.btnRegister}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.registerText}>Ingrese</Text>
      </Pressable>
      {viewMessage && <Text style={styles.messageLogin}>{messageLogin}</Text>}
    </View>
  )
}

export default RegisterScreen

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
