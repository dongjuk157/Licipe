import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaProvider } from 'react-native';
import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';

export default function App() {
  return (
      <View style={styles.container}>
      <Card>
        <Card.Image source={require('./assets/adaptive-icon.png')}>
          <Text style={{marginBottom: 10}}>
            여름에 시원한
          </Text>
         
        </Card.Image>
      </Card>
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
});
