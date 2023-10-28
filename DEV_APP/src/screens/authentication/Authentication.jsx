import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import Layout from '../../layout/Layout'

const Header = () => {
  return (
    <View>
      <View>
        <Image
          style={styles.iconInicio}
          source={require('../../../assets/icons/titulo.png')}
        />
      </View>
    </View>
  )
}

const optionHeader = {
  headerTitle: () => <Header />,
  headerStyle: {
    backgroundColor: '#00a6fb'
  },
  headerTintColor: '#fff',
  headerTitleAlign: 'center'
}

const AuthenticationStack = createNativeStackNavigator()

const Authentication = () => {
  return (
    <NavigationContainer>
      <AuthenticationStack.Navigator initialRouteName='LoginScreen'>
        <AuthenticationStack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={optionHeader}
        />
        <AuthenticationStack.Screen
          name='RegisterScreen'
          component={RegisterScreen}
          options={optionHeader}
        />
        <AuthenticationStack.Screen
          name='Layout'
          component={Layout}
          options={{
            headerShown: false
          }}
        />
      </AuthenticationStack.Navigator>
    </NavigationContainer>

  )
}

export default Authentication

const styles = StyleSheet.create({
  iconInicio: {
    height: 35,
    width: 197
  }
})
