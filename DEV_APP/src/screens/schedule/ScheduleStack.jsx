import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../../components/Header'
import ScheduleScreen from './ScheduleScreen'

const sStack = createNativeStackNavigator()
const ScheduleStack = () => {
  return (
    <sStack.Navigator>
      <sStack.Screen
        name='ScheduleScreen'
        component={ScheduleScreen}
        options={Header.optionHeaderWihtOutBack}
      />
    </sStack.Navigator>
  )
}

export default ScheduleStack
