import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'; // Import HomeScreen
import AppointmentsScreen from '../screens/AppointmentsScreen'; // Import AppointmentsScreen
import HealthDashboard from '../components/HealthDashboard'; // Import HealthDashboard
import { Ionicons } from '@expo/vector-icons'; // Icon library

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'HealthDashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline'; // Icon for HealthDashboard
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Hide header for BottomTabNavigator
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="HealthDashboard" component={HealthDashboard} />
    </Tab.Navigator>
  );
}
