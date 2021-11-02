import React, {createContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const DataManager = createContext();

const Context = props => {


const [login, setLogin] = useState(false)
const [Auth, setAuth] = useState({})
const [userData, setUserData] = useState([])
const [search, setSearch] = useState("")

  const value = {login, setLogin, Auth, setAuth, userData, setUserData, search, setSearch};
  return <DataManager.Provider value={value}>
      {props.children}
  </DataManager.Provider>;
};

export default Context;

const styles = StyleSheet.create({});
