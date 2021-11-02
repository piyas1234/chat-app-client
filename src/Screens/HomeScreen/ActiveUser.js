import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import {Api} from '../../Global/Axios/Api';
import { DataManager } from '../../Global/Context';
import {ActiveUserData} from './Data';
const ActiveUser = () => {
  
   
  const {Auth, userData, setUserData , search, setSearch} = useContext(DataManager)
    
  const config = {
    headers: {
      Authorization: `Bearer ${Auth?.token}`,
    },
  };

  const SearchPeople = async () => {
    try {
      const data = await Api.get(`/friend/search/${search}`,
      config
      
      );
      await  setUserData(data.data.users)
       
    } catch (err) {
      console.log(err)
    }
  };

  const onChangeHandler =(text)=>{

    console.log(text)
    setSearch(text)
    SearchPeople()
  }


  
  return (
    <View>
      <SearchBar
         
        onChangeText={text => onChangeHandler(text)}
        value={search}
        placeholder="Search People"
        inputContainerStyle={{backgroundColor: 'white', elevation: 5}}
      />

      <FlatList
        data={ActiveUserData}
        renderItem={({item}) => (
          <View style={{margin: 10}}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: item.image,
              }}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ActiveUser;

const styles = StyleSheet.create({});
