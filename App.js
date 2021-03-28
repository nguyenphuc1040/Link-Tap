import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

import Home from './src/components/Home';
import Add from './src/components/Add';



const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        
        <Stack.Screen
          name="Home"
          component={Home}></Stack.Screen>
        <Stack.Screen name="Add" component={Add}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
