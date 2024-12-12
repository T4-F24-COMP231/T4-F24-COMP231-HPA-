import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagingScreen from '../screens/MessagingScreen';
import ChatScreen from '../screens/ChatScreen';
import NewMessageScreen from '../screens/NewMessageScreen';

const MessagingStack = createStackNavigator();

export default function MessagingStackNavigator() {
  const [chats, setChats] = useState([
    { id: '1', name: 'Dr. Reeves Keanu', lastMessage: 'Let’s discuss tomorrow', timestamp: '10:30 AM' },
    { id: '2', name: 'Dr. Kevin Hart', lastMessage: 'Appointment confirmed', timestamp: '9:15 AM' },
  ]);

  const addNewChat = (doctor) => {
    const existingChat = chats.find((chat) => chat.id === doctor.id);
    if (!existingChat) {
      setChats((prevChats) => [
        ...prevChats,
        {
          id: doctor.id,
          name: doctor.name,
          lastMessage: 'Start chatting now!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <MessagingStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <MessagingStack.Screen
        name="Messaging"
        options={{ headerTitle: 'Chats' }}
      >
        {(props) => <MessagingScreen {...props} chats={chats} />}
      </MessagingStack.Screen>
      <MessagingStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({ headerTitle: route.params.name })}
      />
      <MessagingStack.Screen
        name="NewMessage"
        options={{ headerTitle: 'New Message' }}
      >
        {(props) => <NewMessageScreen {...props} addNewChat={addNewChat} />}
      </MessagingStack.Screen>
    </MessagingStack.Navigator>
  );
}
