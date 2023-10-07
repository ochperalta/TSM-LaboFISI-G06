import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LaboratoryScreen from '../../screens/laboratory/LaboratoryScreen'
import LaboratoryDetail from '../../screens/laboratory/LaboratoryDetail'
import LaboratoryForm from '../../screens/laboratory/LaboratoryForm'
import ScheduleScreen from '../../screens/schedule/ScheduleScreen'
import UserScreen from '../../screens/user/UserScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DetailsScreen = () => {
  return (
    <View>
      <Text>Detalles</Text>
    </View>
  )
}

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

const LaboratoryStack = createNativeStackNavigator()
const LaboratoryStackScreen = () => {
  return (
    <LaboratoryStack.Navigator initialRouteName='ListLaboratory'>
      <LaboratoryStack.Screen
        name='ListLaboratory'
        component={LaboratoryScreen}
        options={optionHeader}
      />
      <LaboratoryStack.Screen
        name='LaboratoryDetail'
        component={LaboratoryDetail}
        options={optionHeader}
      />
      <LaboratoryStack.Screen
        name='LaboratoryForm'
        component={LaboratoryForm}
        options={optionHeader}
      />
    </LaboratoryStack.Navigator>
  )
}

const UserStack = createNativeStackNavigator()
const UserStackScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name='User'
        component={UserScreen}
        options={optionHeader}
      />
      <UserStack.Screen
        name='Details'
        component={DetailsScreen}
        options={optionHeader}
      />
    </UserStack.Navigator>
  )
}

const ScheduleStack = createNativeStackNavigator()
const ScheduleStackScreen = () => {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name='Schedule'
        component={ScheduleScreen}
        options={optionHeader}
      />
      <ScheduleStack.Screen
        name='Details'
        component={DetailsScreen}
        options={optionHeader}
      />
    </ScheduleStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const Layout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='laboratoryStack'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'ScheduleStack') {
              iconName = focused
                ? 'ios-calendar'
                : 'ios-calendar-outline'
            } else if (route.name === 'laboratoryStack') {
              iconName = focused ? 'ios-albums' : 'ios-albums-outline'
            } else {
              iconName = focused ? 'ios-person' : 'ios-person-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen
          name='ScheduleStack'
          component={ScheduleStackScreen}
          options={{ title: 'Horario' }}
        />
        <Tab.Screen
          name='laboratoryStack'
          component={LaboratoryStackScreen}
          options={{ title: 'Laboratorios' }}
        />
        <Tab.Screen
          name='UserStack'
          component={UserStackScreen}
          options={{ title: 'Usuario' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Layout

const styles = StyleSheet.create({
  iconInicio: {
    height: 35,
    width: 197
  }
})
