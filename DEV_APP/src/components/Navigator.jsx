import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import Reservations from '../screens/HomeScreen/Reservations'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigurationScreen from '../screens/ConfigurationScreen/ConfigurationScreen'
import UserOptionsScreen from '../screens/UserOptionsScreen/UserOptionsScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}

        />
        <Stack.Screen
          name="Configuration"
          component={ConfigurationScreen}
          options={{ title: 'Configuración e Información' }}
        />
        <Stack.Screen
          name="UserOptions"
          component={UserOptionsScreen}
          options={{ title: 'Pepe de Prueba' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})