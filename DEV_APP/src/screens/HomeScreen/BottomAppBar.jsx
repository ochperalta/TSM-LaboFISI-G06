import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BottomAppBar = ({ onButtonPress }) => {
  const [scheduleIcon, setScheduleIcon] = useState(false);
  const [homeIcon, setHomeIcon] = useState(true);
  const [reservationIcon, setReservationIcon] = useState(false);

  const handlePress = (changeOption) => {
    switch (changeOption) {
      case 1:
        setScheduleIcon(false)
        setHomeIcon(true)
        setReservationIcon(false)
        break
      case 2:
        setScheduleIcon(true)
        setHomeIcon(false)
        setReservationIcon(false)
        break
      case 3:
        setScheduleIcon(false)
        setHomeIcon(false)
        setReservationIcon(true)
        break
      default:
        setScheduleIcon(false)
        setHomeIcon(true)
        setReservationIcon(false)
        break
    }
    onButtonPress(changeOption)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress(2)}>
        <Image
          style={styles.iconHorario}
          source={scheduleIcon ?
            require('../../../assets/icons/horario-focus.png')
            : require('../../../assets/icons/horario.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(1)}>
        <Image
          style={styles.iconInicio}
          source={homeIcon ?
            require('../../../assets/icons/inicio-focus.png')
            : require('../../../assets/icons/inicio.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(3)}>
        <Image
          style={styles.iconInicio}
          source={reservationIcon ?
            require('../../../assets/icons/reserva-focus.png')
            : require('../../../assets/icons/reserva.png')}
        />

      </TouchableOpacity>
    </View>
  )
}

export default BottomAppBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    height: 80, // Ajusta la altura según tus necesidades
    borderTopColor: 'rgba(0, 0, 0, 0.25)', // Color negro al 25% de opacidad
    borderTopWidth: 1, // Grosor del borde superior
    //elevation:10
  },
  iconButton: {
    alignItems: 'center',
    width: '33%'
  },
  iconHorario: {
    height: 59,
    width: 51
  },
  iconInicio: {
    height: 59,
    width: 40
  },
  iconReserva: {
    height: 56,
    width: 48
  }
})