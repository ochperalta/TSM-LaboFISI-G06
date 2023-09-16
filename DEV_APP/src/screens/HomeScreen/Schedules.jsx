import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'

const Schedules = () => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal={true} // Habilita el desplazamiento horizontal
      >
        <View style={styles.contenido}>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti obcaecati magni fugiat expedita quae fugit eligendi! Nesciunt voluptatum repudiandae voluptas, ab quasi maiores cumque ipsa omnis nihil asperiores neque eveniet totam eos laudantium perspiciatis. Nihil obcaecati autem veritatis voluptatem provident, vel officia vero, libero consequuntur tenetur suscipit sint saepe nobis assumenda consequatur cum? Nisi repudiandae qui sint aspernatur inventore in quis fugit porro deleniti, explicabo aliquid! Sed nobis laboriosam, sequi dolor velit molestiae accusantium similique id dolore vero delectus, incidunt minus architecto sunt nulla doloremque quibusdam, debitis excepturi ex odio. Quae, repellendus non voluptatum delectus ipsam nostrum dolore dolorem incidunt distinctio nisi recusandae iste cumque sit quia sunt illo cum harum magni quod, doloremque magnam vero accusantium dolor! Assumenda vitae necessitatibus animi error perferendis aspernatur, harum temporibus voluptatibus sed laboriosam, consequatur mollitia a obcaecati! Minima porro, consectetur magnam reprehenderit</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Schedules

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el ScrollView crezca en altura según el contenido
  },
  contenido: {
    width: 1000, // Ancho del contenido para habilitar el desplazamiento horizontal
    padding: 20,
    backgroundColor: 'lightgray', // Cambia el color de fondo según tus preferencias
  },
});