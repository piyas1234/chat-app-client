import React, { useContext } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
 import ActiveUser from './ActiveUser';
import Recent from './Recent';
 

const HomeScreen = () => {


 
 
  return (
    
      
      <FlatList
        data={[]}
        ListHeaderComponent={( ) => <ActiveUser/>}
        ListFooterComponent={()=><Recent/>}
      />    
      
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
