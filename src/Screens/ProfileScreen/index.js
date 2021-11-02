import React, { useContext, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Input, SocialIcon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { clearAll } from '../../Global/AsncStorage';
import { DataManager } from '../../Global/Context';
const ProfileScreen = () => {

    const [edit, setEdit] = useState(true)
     const {login, setLogin , Auth} = useContext(DataManager)

    const logoutHandler = async ()=>{
      try{
        await clearAll()
        await setLogin(Math.random())
      }
      catch(err){

      }
    }
    

  return Auth?.auth ? (
    <View>
      <View style={{alignSelf: 'center', marginVertical: 20}}>
        <TouchableOpacity onPress={()=>setEdit(!edit)} style={{alignSelf: 'flex-end'}}>
          {edit &&  <Feather name="edit" color="red" size={30} />}
          {!edit && <MaterialIcons name="done"  size={30}/> }
        </TouchableOpacity>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
      </View>

      <Input label={'Your Name'} value={Auth.user.name} disabled={edit} />
      <Input label={'Your Email'} value={Auth.user.email} disabled={edit} />
      <Input label={'Your Phone'} value={Auth.user.phone} disabled={edit}/>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <SocialIcon type="twitter" />

        <SocialIcon light type="medium" />
        <SocialIcon light type="instagram" />
        <SocialIcon title="Sign In With Facebook" type="facebook" />
      </View>


      <View style={{alignSelf:'center'}}>
      <Button onPress={logoutHandler} containerStyle={{width:'40%', borderRadius:30 ,padding:10  }} title="logout"/>
      </View>
    </View>

  ):

  (
    <View>
      <Text>Logged out done successfully </Text>
    </View>
  )
};

export default ProfileScreen;

const styles = StyleSheet.create({});
