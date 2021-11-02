import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Api} from '../../../Global/Axios/Api';
import {DataManager} from '../../../Global/Context';
import {Avatar, Button, Card, colors} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/core';
const Friends = () => {
  const {Auth} = useContext(DataManager);
  const [data, setData] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };

  const getFriendRequestData = async () => {
    try {
      const Data = await Api.get(`/friend/friends`, config);
      console.warn(Data.data.friends);
      setData(Data.data.friends);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriendRequestData();
  }, []);

  return (
    <FlatList data={data} renderItem={({item}) => <RenderItem fn={getFriendRequestData} item={item} />} />
  );
};


const RenderItem = ({item, fn}) => {
  const data = item.friendId;

  console.log(data)

  const {Auth} = useContext(DataManager);
  const navigation = useNavigation()
  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };
  const UnFriend = async id => {
    
    try {
      const data = await Api.get(`/friend/unfriend/${id}`, config);
      await fn()
      console.log(data);
    } catch (err) {}
  };

  return (
    <Card>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{width: '20%'}}>
          <Avatar
            title={data.name.slice(0, 2)}
            containerStyle={{backgroundColor: 'tomato'}}
          />
        </View>
        <View style={{width: '40%'}}>
          <Text style={{fontFamily: 'Nexa Bold', fontSize: 17}}>
            {data.name}
          </Text>
          <Text style={{fontFamily: 'Nexa Bold', fontSize: 14}}>
            {data.email}
          </Text>
        </View>
          <Entypo onPress={()=>navigation.navigate("MessageScreen", {friend:data})} size={40} color={colors.secondary} name="message" />
        <View>
          <Button
            onPress={() => UnFriend(data._id)}
            title="unfriend"
          />
        </View>
      </View>
    </Card>
  );
};


export default Friends;

const styles = StyleSheet.create({});

 
