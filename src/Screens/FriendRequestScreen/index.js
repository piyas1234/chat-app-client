import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Friends from './Friends';
import Requested from './Requested';
import Request from './Request';


const Tab = createMaterialTopTabNavigator();

const FriendRequestScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Friends">
     <Tab.Screen name="Friends" component={Friends} />
    <Tab.Screen name="Requested" component={Requested} />
    <Tab.Screen name="Request" component={Request} />
  </Tab.Navigator>
  )
}

export default FriendRequestScreen

const styles = StyleSheet.create({})
