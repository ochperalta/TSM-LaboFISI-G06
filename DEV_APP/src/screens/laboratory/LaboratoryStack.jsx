import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LaboratoryScreen from './LaboratoryScreen'
import LaboratoryDetail from './LaboratoryDetail'
import LaboratoryForm from './LaboratoryForm'
import Header from '../../components/Header'
import InventoryForm from '../inventory/InventoryForm'

const LabStack = createNativeStackNavigator()
const LaboratoryStack = () => {
  return (
    <LabStack.Navigator initialRouteName='ListLaboratory'>
      <LabStack.Screen
        name='ListLaboratory'
        component={LaboratoryScreen}
        options={Header.optionHeaderWihtOutBack}
      />
      <LabStack.Screen
        name='LaboratoryDetail'
        component={LaboratoryDetail}
        options={Header.optionHeader}
      />
      <LabStack.Screen
        name='LaboratoryForm'
        component={LaboratoryForm}
        options={Header.optionHeader}
      />
      <LabStack.Screen
        name='InventoryForm'
        component={InventoryForm}
        options={Header.optionHeader}
      />
    </LabStack.Navigator>
  )
}

export default LaboratoryStack
