import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SyncIntroScreen from '../screens/SyncIntroScreen';
import DeviceListScreen from '../screens/DeviceListScreen';
import ConnectingScreen from '../screens/ConnectingScreen';
import ConnectionSuccessScreen from '../screens/ConnectionSuccessScreen';
import ConnectionFailureScreen from '../screens/ConnectionFailureScreen';

const Stack = createStackNavigator();

export default function SyncNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SyncIntro"
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="SyncIntro"
        component={SyncIntroScreen}
        options={{ headerTitle: 'Sync Wearables' }}
      />
      <Stack.Screen
        name="DeviceList"
        component={DeviceListScreen}
        options={{ headerTitle: 'Select Device' }}
      />
      <Stack.Screen
        name="Connecting"
        component={ConnectingScreen}
        options={{ headerTitle: 'Connecting Device' }}
      />
      <Stack.Screen
        name="ConnectionSuccess"
        component={ConnectionSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConnectionFailure"
        component={ConnectionFailureScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
