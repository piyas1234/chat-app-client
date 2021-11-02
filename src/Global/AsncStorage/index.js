import AsyncStorage from '@react-native-async-storage/async-storage';


export const getMyStringValue = async (key) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch(e) {
      // read error
    }
  
    console.log('Done.')
  
  }


  
export const getMyObject = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
  
    console.log('Done.')
  
  }



  
  export const setStringValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch(e) {
      // save error
    }
  
    console.log('Done.')
  }



  
  export const setObjectValue = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch(e) {
      // save error
    }
  
    console.log('Done.')
  }

  export const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }


  export const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  