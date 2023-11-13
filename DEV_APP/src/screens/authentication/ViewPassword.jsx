import { Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
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

export default ViewPassword

const styles = StyleSheet.create({
  btnViewPassword: {
    marginHorizontal: 10
  }
})
