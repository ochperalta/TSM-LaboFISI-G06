import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import ScheduleScreen from '../screens/schedule/ScheduleScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LaboratoryStack from '../screens/laboratory/LaboratoryStack'
import UserStack from '../screens/user/UserStack'

const optionTab = (route) => {
  return {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName

      if (route.name === 'ScheduleStack') {
        iconName = focused
          ? 'ios-calendar'
          : 'ios-calendar-outline'
      } else if (route.name === 'LaboratoryStack') {
        iconName = focused ? 'ios-albums' : 'ios-albums-outline'
      } else {
        iconName = focused ? 'ios-person' : 'ios-person-outline'
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray'
  }
}

// const ScheduleStack = createNativeStackNavigator()
// const ScheduleStackScreen = () => {
//   return (
//     <ScheduleStack.Navigator>
//       <ScheduleStack.Screen
//         name='Schedule'
//         component={ScheduleScreen}
//         options={optionHeader}
//       />
//       <ScheduleStack.Screen
//         name='Details'
//         component={DetailsScreen}
//         options={optionHeader}
//       />
//     </ScheduleStack.Navigator>
//   )
// }

const Tab = createBottomTabNavigator()
const Layout = () => {
  return (
    <Tab.Navigator
      initialRouteName='LaboratoryStack'
      screenOptions={({ route }) => (optionTab(route))}
    >
      {/* <Tab.Screen
          name='ScheduleStack'
          component={ScheduleStackScreen}
          options={{ title: 'Horario' }}
        /> */}
      <Tab.Screen
        name='LaboratoryStack'
        component={LaboratoryStack}
        options={{ title: 'Laboratorio' }}
      />
      <Tab.Screen
        name='UserStack'
        component={UserStack}
        options={{ title: 'Usuario' }}
      />
    </Tab.Navigator>
  )
}

export default Layout
