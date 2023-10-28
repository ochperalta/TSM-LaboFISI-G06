import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <View>
        <Image
          style={styles.iconInicio}
          source={require('../../assets/icons/titulo.png')}
        />
      </View>
    </View>
  )
}

export default {
  optionHeader: {
    headerTitle: () => <Header />,
    headerStyle: {
      backgroundColor: '#00a6fb'
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center'
  },
  optionHeaderWihtOutBack: {
    headerTitle: () => <Header />,
    headerStyle: {
      backgroundColor: '#00a6fb'
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerLeft: () => null
  }
}

const styles = StyleSheet.create({
  iconInicio: {
    height: 35,
    width: 197
  }
})
