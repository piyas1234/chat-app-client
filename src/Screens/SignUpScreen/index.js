import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Api} from '../../Global/Axios/Api';

const SignUpScreen = ({navigation}) => {
  const [errorMsg, setErrorMsg] = useState({});
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  console.log(errorMsg);

  const phoneNumber = phone => {
     if(phone.length > 11 || phone.length < 10){
        setErrorMsg({...errorMsg, phone: "please add a valid phone number"})
     }else{
      setErrorMsg({...errorMsg, phone:true})
     }
  };

  const isEmail = email => {
    // Regular Expression (Not accepts second @ symbol
    // before the @gmail.com and accepts everything else)
    var regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexp.test(String(email).toLowerCase()) === true) {
      setErrorMsg({...errorMsg, email: true});
    } else {
      setErrorMsg({...errorMsg, email: 'please add a valid email'});
    }
  };

  const submitData = async () => {
    if (input.name === '' || input.email === '' || input.password === '') {
      return Alert.alert('validation error', 'Please fill all the fileds');
    }

    await phoneNumber(input.phone);
    await  isEmail(input.email);
    try {
      const data = await Api.post(`/auth/signup/`, input);
      await Alert.alert(  data.data.message)
      console.log(data)
    } catch (err) {
       Alert.alert( "validation error" ,"please add a unique email and phone number")
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Create a account</Text>
      <Input
        onChangeText={text => setInput({...input, name: text})}
        placeholder="Enter your name"
        leftIcon={<FontAwesome name="user" size={24} color="black" />}
      />
      <Input
        onChangeText={text => setInput({...input, email: text})}
        placeholder="Enter your email"
        leftIcon={<Icon name="mail" size={24} color="black" />}
        errorMessage={errorMsg.email}
      />

      <Input
        onChangeText={text => setInput({...input, phone: text})}
        placeholder="Enter your phone"
        leftIcon={<Icon name="call" size={24} color="black" />}
        errorMessage={errorMsg.phone}
      />

      <Input
        onChangeText={text => setInput({...input, password: text})}
        placeholder="Enter your password"
        leftIcon={<FontAwesome name="lock" size={24} color="black" />}
      />

      <Button onPress={submitData} title="SignUp" />

      <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Nexa Bold', fontSize: 16}}>
          Have hot a account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={{fontFamily: 'Nexa Bold', fontSize: 16, color: 'skyblue'}}>
            login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: 'Nexa Bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  main: {
    height: '100%',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
