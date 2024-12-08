import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AppointmentsStackNavigator from './AppointmentsStackNavigator';
import { Ionicons } from '@expo/vector-icons';
import SyncNavigator from '../navigation/SyncNavigator';
import MessagingStackNavigator from './MessagingStackNavigator'; // Messaging Stack
import HomeStackNavigator from './HomeStackNavigator';
import HealthMetricsScreen from '../screens/HealthMetricsScreen';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Icons for Home
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline'; // Icons for Appointments
          } else if (route.name === 'Sync') {
            iconName = focused ? 'sync' : 'sync-outline'; // Icons for Sync
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'; // Icons for Messages
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
       <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Appointments" component={AppointmentsStackNavigator} />
      <Tab.Screen name="Sync" component={SyncNavigator} />
      <Tab.Screen name="Messages" component={MessagingStackNavigator} />
      <Tab.Screen name="HealthMetrics" component={HealthMetricsScreen} />
    </Tab.Navigator>
  );
}
