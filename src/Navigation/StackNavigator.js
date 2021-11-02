import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import MessageScreen from '../Screens/MessageScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {getMyObject} from '../Global/AsncStorage';
import {DataManager} from '../Global/Context';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const {login, setLogin, Auth, setAuth} = useContext(DataManager);
  console.log(login);
  useEffect(() => {
    getLoginData();

    console.log('useEffect woring well');
  }, [login]);

  const getLoginData = async () => {
    try {
      const data = await getMyObject('LOGIN');
      await setAuth(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(Auth);

  return (
    <Stack.Navigator>
      {Auth?.auth === true ? (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerMode: 'none',
            }}
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />

          <Stack.Screen
            options={{
              title: 'Chat Now',
              
            }}
            
            name="MessageScreen"
            component={MessageScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerMode: 'none',
            }}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerMode: 'none',
            }}
            name="SignUpScreen"
            component={SignUpScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
