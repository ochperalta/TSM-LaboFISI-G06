import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, BackHandler, ActivityIndicator } from 'react-native'
import { getAll } from '../../services/schedule'

const ScheduleScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [scheduleList, setScheduleList] = useState([])
  const [load, setload] = useState(true)
  function getScheduleList () {
    getAll()
      .then(data => {
        setScheduleList(data) // Actualiza el estado con los datos obtenidos
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error)
      })
      .finally(setload(false))
  }

  useEffect(() => {
    // Obtener el día actual al montar el componente
    getScheduleList()
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
              <Text style={styles.labName}>{item.laboratory}</Text>
              <Text style={styles.labSchedule}>{item.init + ' - ' + item.end}</Text>
              <Text style={styles.labCourse}>{item.course}</Text>
            </View>
          )}
          keyExtractor={(lab) => lab.schedule_id}
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
        {load && <ActivityIndicator />}
        <FlatList
          data={scheduleList}
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
    alignItems: 'center',
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
