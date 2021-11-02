import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Api} from '../../../Global/Axios/Api';
import {DataManager} from '../../../Global/Context';
import {Avatar, Button, Card} from 'react-native-elements';

const Request = () => {
  const {Auth} = useContext(DataManager);
  const [data, setData] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };

  const getFriendRequestData = async () => {
    try {
      const Data = await Api.get(`/friend/request`, config);
      console.log(Data.data);
      setData(Data.data.friendRequest);
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

  const {Auth} = useContext(DataManager);

  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };
  const CancelFriendRequest = async id => {
    
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

        <View>
          <Button
            onPress={() => CancelFriendRequest(data._id)}
            title="cancel Request"
          />
        </View>
      </View>
    </Card>
  );
};


export default Request;

const styles = StyleSheet.create({});

 