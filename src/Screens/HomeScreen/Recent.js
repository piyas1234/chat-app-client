import React, {useContext} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {ActiveUserData} from './Data';
import {Avatar, Card, ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {DataManager} from '../../Global/Context';
import {Api} from '../../Global/Axios/Api';
 
import { showMessage, hideMessage } from "react-native-flash-message";

const Recent = () => {
  const {userData, search} = useContext(DataManager);

  return search==="" ?(
    <FlatList
      ListHeaderComponent={() => (
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Nexa Bold',
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}>
          Recent
        </Text>
      )}
      data={ActiveUserData}
      renderItem={({item}) => <RenderItem item={item} />}
    />
  ) : (
    <FlatList
      data={userData}
      renderItem={({item}) => <RenderItem2 item={item} />}
    />
  );
};

export default Recent;

const styles = StyleSheet.create({});

const RenderItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
      <Card containerStyle={{margin: 0, padding: 0}}>
        <ListItem>
          <Avatar size="medium" rounded source={{uri: item.image}} />
          <ListItem.Content>
            <ListItem.Title style={{fontFamily: 'Nexa Bold', fontSize: 16}}>
              {' '}
              {item.name}{' '}
            </ListItem.Title>
            <Text style={{fontFamily: 'FRABK'}}>hello how are you?</Text>
          </ListItem.Content>
          <Text style={{fontFamily: 'Nexa Bold', fontSize: 11}}>4.00 pm</Text>
        </ListItem>
      </Card>
    </TouchableOpacity>
  );
};

const RenderItem2 = ({item}) => {
  const navigation = useNavigation();
  const {Auth} = useContext(DataManager);

  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };

  const addFriendAction = async id => {
    try {
      const data = await Api.post(`/friend/request/${id}`, {}, config);
      console.log(data)
      showMessage({
        message:data.data.message,
        type: "info",
      });

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card containerStyle={{margin: 20, padding: 20}}>
      <View style={{alignSelf: 'center'}}>
        <Avatar
          containerStyle={{backgroundColor: 'tomato'}}
          size="medium"
          rounded
          title={item.name.slice(0, 2)}
        />
      </View>

      <Text
        style={{fontFamily: 'Nexa Bold', fontSize: 17, textAlign: 'center'}}>
        {item.name}
      </Text>
      <Text
        style={{
          fontFamily: 'Nexa Bold',
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        {item.email}
      </Text>
      <Button onPress={() => addFriendAction(item._id)} title="add Friend" />
    </Card>
  );
};
