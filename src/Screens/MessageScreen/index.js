// import React, {useState, useCallback, useEffect} from 'react';
// import {FlatList, View} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import {io} from 'socket.io-client';
// import {getMyObject} from '../../Global/AsncStorage';
// import {Avatar, Button, Input, Text} from 'react-native-elements';
// const ENDPOINT = 'ws://192.168.43.71:1000';
// let socket;

// const MessageScreen = ({navigation, route}) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const friend = route.params.friend;
//   const [user, setUser] = useState({});

//   const getUserData = async () => {
//     try {
//       const userData = await getMyObject('LOGIN');
//       await setUser(userData.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);
//   useEffect(() => {
//     socket = io(ENDPOINT, {transports: ['websocket']});
//     socket.on('connect', () => {
//       console.log('connected!');
//     });

//     socket.emit('addUser', {user: user});
//     socket.on('getUsers', data => {
//       console.log(data);
//     });
//   }, [user]);

//   const onSend = () => {
//     const userSocket = io(ENDPOINT + '/namespace' + user._id, {
//       transports: ['websocket'],
//     });
//     const receiverSocket = io(ENDPOINT + '/namespace' + friend._id, {
//       transports: ['websocket'],
//     });
//     socket.emit('sendMessage', {user: user, receiver: friend, text: messages});
//     userSocket.on('getMessage', data => {
//       console.log(data, '===============>');
//     });
//   };

//   return (
//     <View style={{height: '100%'}}>
//       <View style={{height: '90%'}}>
//         <FlatList
//           data={[
//             1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//             1,
//           ]}
//           renderItem={() => <Text h1>Hello</Text>}

//         />
//       </View>

//       <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
//         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//           <Input placeholder="Text now..." containerStyle={{width: '80%'}} />
//           <Button title="send" />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MessageScreen;

// const Message = ()=>{
//   return (
//     <View>
//       <Avatar title="pi" size="medium" />
//       <Text>Hi piyas</Text>
//     </View>
//   )
// }

import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {io} from 'socket.io-client';
import {getMyObject} from '../../Global/AsncStorage';
const ENDPOINT = 'ws://192.168.43.71:1000';
 
let socket;

const MessageScreen = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const friend = route.params.friend;
  const [user, setUser] = useState({});


  const userSocket = io(ENDPOINT + '/namespace' + user._id, {
    transports: ['websocket'],
  });
  const receiverSocket = io(ENDPOINT + '/namespace' + friend._id, {
    transports: ['websocket'],
  });

  const getUserData = async () => {
    try {
      const userData = await getMyObject('LOGIN');
      await setUser(userData.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    socket = io(ENDPOINT, {transports: ['websocket']});
    socket.on('connect', () => {
      console.log('connected!');
    });

    socket.emit('addUser', {user: user});
    socket.on('getUsers', data => {
      console.log(data);
    });
  }, [user]);

  

  const onSend = messages => {
     
 
    socket.emit('sendMessage', {
      user: {_id: user._id, name: user.name},
      receiver: {_id: friend._id, name: friend.name},
      text: messages[0].text,
    });
    userSocket.on('getMessage', async data => {
      const messageData = await messages.find(item => item._id === data.id);
      await !messageData &&
        setMessages([
          ...messages,
          {
            _id: data.id,
            text: data.text,
            createdAt: new Date(),
            user: {
              _id: user._id === data.user._id ? 1 : 2,
              name: data.user.name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]);
    });
  };

  console.log(messages)

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
