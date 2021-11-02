import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Api} from '../../../Global/Axios/Api';
import {DataManager} from '../../../Global/Context';
import {Avatar, Button, Card} from 'react-native-elements';

const Requested = () => {
  const {Auth} = useContext(DataManager);
  const [data, setData] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };

  const getFriendRequestedData = async () => {
    try {
      const Data = await Api.get(`/friend/requested`, config);
      console.log(Data.data);
      setData(Data.data.friendRequested);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriendRequestedData();
  }, []);

  return (
    <FlatList data={data} renderItem={({item}) => <RenderItem fn={getFriendRequestedData} item={item} />} />
  );
};


 


export default Requested;

const styles = StyleSheet.create({});



const RenderItem = ({fn, item}) => {
    const data = item.friendId;
  
    console.log(item)
  
    const {Auth} = useContext(DataManager);
  
    const config = {
      headers: {
        Authorization: `Bearer ${Auth?.token}`,
      },
    };
    const ConfrimFriendRequest = async id => {
       console.warn(id)
      try {
        const data = await Api.put(`/friend/accept/${id}`,{}, config);
        await fn()
        await console.log(data,'========================>');
      } catch (err) {
          console.log(err)
      }
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
              onPress={() => ConfrimFriendRequest(data._id)}
              title="Confirm Request"
            />
          </View>
        </View>
      </Card>
    );
  };

 
