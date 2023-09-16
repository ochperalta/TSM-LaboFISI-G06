import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.jsx';

export default function App() {
  return (
    <>
      <HomeScreen></HomeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },containerOption: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
