import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator';
import Context from './src/Global/Context';

import FlashMessage from "react-native-flash-message"; 
import {StatusBar} from 'react-native'

const App = () => {
  return (
    <Context>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <FlashMessage position="top" />
    </Context>
  );
};

export default App;

const styles = StyleSheet.create({});
