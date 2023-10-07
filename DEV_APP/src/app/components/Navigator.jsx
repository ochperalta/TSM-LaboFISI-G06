import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConfigurationScreen from '../../screens/ConfigurationScreen/ConfigurationScreen'
import UserOptionsScreen from '../../screens/UserOptionsScreen/UserOptionsScreen'
import LabDataScreen from '../../screens/LabDataScreen/LabDataScreen'
import Home from '../../screens/HomeScreen/Home'
import TopAppBar from '../../screens/HomeScreen/TopAppBar'

const Stack = createNativeStackNavigator()

const Navigator = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerTitle: () => <TopAppBar /> }}

        />
        <Stack.Screen
          name='Configuration'
          component={ConfigurationScreen}
          options={{ headerShown: false, title: 'Configuración e Información' }}
        />
        <Stack.Screen
          name='UserOptions'
          component={UserOptionsScreen}
          options={{ headerShown: false, title: 'Pepe de Prueba' }}
        />
        <Stack.Screen
          name='LabDataScreen'
          component={LabDataScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='TopAppBar'
          component={TopAppBar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default Navigator
