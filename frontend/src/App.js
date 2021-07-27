import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';
import Carousel from './components/common/Carousel';


const screenWidth = Dimensions.get('window').width
const PAGES = [
  {
    num: 1,
    color: '#86E3CE',
  },
  {
    num: 2,
    color: '#D0E6A5',
  },
  {
    num: 3,
    color: '#FFDD94',
  },
  {
    num: 4,
    color: '#FA897B',
  },
  {
    num: 5,
    color: '#CCABD8',
  },
];

const App = () => {
  return (
    <View style={styles.container}>
      <Carousel
        gap={16}
        offset={36}
        pages={PAGES}
        pageWidth={screenWidth - (16 + 36) * 2}
      />
      <View>
        <Card style={styles.}>
          <Card.Image source={require('../assets/adaptive-icon.png')}>
            <Text style={{marginBottom: 10}}>
              여름에 시원한
            </Text>
          
          </Card.Image>
        </Card>
        <Card>
          <Card.Image source={require('../assets/adaptive-icon.png')}>
            <Text style={{marginBottom: 10}}>
              여름에 뜨거운
            </Text>
          
          </Card.Image>
        </Card>
      </View>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeContainer: {
    justifyContent
  }
});

export default App