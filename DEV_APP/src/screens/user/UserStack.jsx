import React from 'react'
import Header from '../../components/Header'
import UserScreen from './UserScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UStack = createNativeStackNavigator()

const UserStack = () => {
  return (
    <UStack.Navigator>
      <UStack.Screen
        name='User'
        component={UserScreen}
        options={Header.optionHeader}
      />
    </UStack.Navigator>
  )
}

export default UserStack
