import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, BackHandler } from 'react-native'

const ScheduleScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    // Obtener el día actual al montar el componente
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' })
    console.log(today)
    setSelectedDay(today)

    const handleBackPress = () => {
      const currentScreen = navigation.isFocused()
      console.log(currentScreen)
      if (currentScreen) {
        return true
      }

      return false
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => backHandler.remove()
  }, [navigation])

  const weeklyScheduleData = [
    {
      day: 'Lunes',
      labs: [
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab C', schedule: '14:00 - 16:00', course: 'Curso 3' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' },
        { name: 'Lab A', schedule: '8:00 - 10:00', course: 'Curso 1' },
        { name: 'Lab B', schedule: '10:00 - 12:00', course: 'Curso 2' }
      ]
    },
    {
      day: 'Martes',
      labs: [
        { name: 'Lab D', schedule: '9:00 - 11:00', course: 'Curso 4' },
        { name: 'Lab E', schedule: '11:00 - 13:00', course: 'Curso 5' },
        { name: 'Lab F', schedule: '14:30 - 16:30', course: 'Curso 6' }
      ]
    },
    {
      day: 'Miércoles',
      labs: [
        { name: 'Lab G', schedule: '8:30 - 10:30', course: 'Curso 7' },
        { name: 'Lab H', schedule: '10:30 - 12:30', course: 'Curso 8' },
        { name: 'Lab I', schedule: '14:00 - 16:00', course: 'Curso 9' }
      ]
    },
    {
      day: 'Jueves',
      labs: [
        { name: 'Lab J', schedule: '9:30 - 11:30', course: 'Curso 10' },
        { name: 'Lab K', schedule: '11:30 - 13:30', course: 'Curso 11' },
        { name: 'Lab L', schedule: '15:00 - 17:00', course: 'Curso 12' }
      ]
    },
    {
      day: 'Viernes',
      labs: [
        { name: 'Lab M', schedule: '8:00 - 10:00', course: 'Curso 13' },
        { name: 'Lab N', schedule: '10:00 - 12:00', course: 'Curso 14' },
        { name: 'Lab O', schedule: '13:30 - 15:30', course: 'Curso 15' }
      ]
    },
    {
      day: 'Sábado',
      labs: [
        { name: 'Lab P', schedule: '9:00 - 11:00', course: 'Curso 16' },
        { name: 'Lab Q', schedule: '11:00 - 13:00', course: 'Curso 17' },
        { name: 'Lab R', schedule: '14:30 - 16:30', course: 'Curso 18' }
      ]
    }
  ]

  const renderDayItem = ({ item }) => (
    <View style={styles.dayContainer}>
      <TouchableOpacity onPress={() => setSelectedDay(item.day.toString().toLowerCase())}>
        <View style={[styles.dayButton, selectedDay === item.day.toString().toLowerCase() && styles.selectedDayButton]}>
          <Text style={[styles.dayText, selectedDay === item.day.toString().toLowerCase() && styles.selectedDayText]}>
            {selectedDay === item.day.toString().toLowerCase() ? item.day : item.day.substring(0, 3)}
          </Text>
        </View>
      </TouchableOpacity>
      {selectedDay === item.day.toString().toLowerCase() && (
        <FlatList
          data={item.labs}
          renderItem={({ item }) => (
            <View style={styles.labContainer}>
              <Text style={styles.labName}>{item.name}</Text>
              <Text style={styles.labSchedule}>{item.schedule}</Text>
              <Text style={styles.labCourse}>{item.course}</Text>
            </View>
          )}
          keyExtractor={(lab) => lab.name}
        />
      )}
    </View>
  )
  return (
    <>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Horario Semanal de Laboratorios</Text>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={weeklyScheduleData}
          renderItem={renderDayItem}
          keyExtractor={(day) => day.day}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dayList}
        />
      </View>
    </>

  )
}

export default ScheduleScreen

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10
  },
  titleText: {
    fontWeight: '500'
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 10,
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  dayList: {
    marginBottom: 16
  },
  dayContainer: {
    marginBottom: 16
  },
  dayButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 8
  },
  selectedDayButton: {
    backgroundColor: '#00a6fb', // Color de fondo cuando está seleccionado
    borderColor: '#00a6fb'
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center'
  },
  selectedDayText: {
    color: 'white' // Color del texto cuando está seleccionado
  },
  labContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 280
  },
  labName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  labSchedule: {
    fontSize: 14
  }
})
