import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MessageScreen from '../Screens/MessageScreen';
import FriendRequestScreen from '../Screens/FriendRequestScreen';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'skyblue',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Chat',
          tabBarIcon: () => <Ionicons size={20} name="chatbox" />,
        }}
      />

      <Tab.Screen
        options={{
          headerShown:false,
          title: 'Friend',
          tabBarIcon: () => <FontAwesome size={20} name="users" />,
        }}
        name="FriendRequestScreen"
        component={FriendRequestScreen}
      />

      <Tab.Screen
        options={{
          title: 'Profile',
          tabBarIcon: () => <FontAwesome size={20} name="user" />,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
