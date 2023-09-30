import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TopAppBar = ({navigationConfiguration, navigationUserOption}) => {
  return (
    <>
      
      <View style={styles.container}>
      
        <TouchableOpacity onPress={navigationConfiguration}>
          <Image
            style={styles.iconMenu}
            source={require('../../../assets/icons/menu.png')}
          />
        </TouchableOpacity>
        <View>
          <Image
            style={styles.iconInicio}
            source={require('../../../assets/icons/titulo.png')}
          />
        </View>
        <TouchableOpacity onPress={navigationUserOption}>
          <Image
            style={styles.iconAvatar}
            source={require('../../../assets/icons/avatar.png')}
          />
        </TouchableOpacity>
      </View>
    </>

  )
}

export default TopAppBar

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 85, // Ajusta la altura según tus necesidades
    backgroundColor: 'rgba(147, 40, 40, 1)',
    borderTopColor: 'rgba(0, 0, 0, 0.25)', // Color negro al 25% de opacidad
    borderTopWidth: 1, // Grosor del borde superior
  },
  iconMenu: {
    height: 40,
    width: 40,
  },
  iconInicio: {
    height: 27,
    width: 160
  },
  iconAvatar: {
    height: 40,
    width: 40
  }
})