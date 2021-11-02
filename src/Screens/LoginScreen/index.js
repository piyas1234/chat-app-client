import React, {useContext, useState} from 'react';
import {PlatformColor, StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import {Button, colors, Icon, Input} from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { setObjectValue } from '../../Global/AsncStorage';
import {Api} from '../../Global/Axios/Api';
import { DataManager } from '../../Global/Context';

const LoginScreen = ({navigation}) => {
  const [input, setInput] = useState({});

  const { setLogin} = useContext(DataManager)

  const loginAction = async () => {
    try {
      const data = await Api.post('/auth/login/', input);
      console.log(data)
      await  setObjectValue( "LOGIN", data.data)
      await setLogin(Math.random())

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Login User</Text>
      <Input
        onChangeText={text => setInput({...input, email: text})}
        placeholder="Enter your email"
        leftIcon={<Icon name="mail" size={24} color="black" />}
      />

      <Input
        onChangeText={text => setInput({...input, password: text})}
        placeholder="Enter your password"
        leftIcon={<FontAwesome name="lock" size={24} color="black" />}
      />

      <Button onPress={loginAction} title="Login" />

      <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Nexa Bold', fontSize: 16}}>
          Have hot a account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text
            style={{fontFamily: 'Nexa Bold', fontSize: 16, color: 'skyblue'}}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: 'Nexa Bold',
    textAlign: 'center',
    color:colors.searchBg,
    marginBottom: 20,
  },
  main: {
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
