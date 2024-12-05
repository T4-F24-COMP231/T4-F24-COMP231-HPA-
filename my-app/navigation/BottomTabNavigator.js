import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import HealthDashboard from '../components/HealthDashboard';
import ITSupportDashboard from '../screens/ITSupportDashboard';
import RaiseSupportTicket from '../screens/RaiseSupportTicket'; // Import Raise Support Ticket screen
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Appointments':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'HealthDashboard':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'ITSupport':
              iconName = focused ? 'construct' : 'construct-outline';
              break;
            case 'RaiseTicket':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="HealthDashboard" component={HealthDashboard} />
      <Tab.Screen name="ITSupport" component={ITSupportDashboard} />
      <Tab.Screen 
        name="RaiseTicket" 
        component={RaiseSupportTicket} 
        options={{ tabBarLabel: 'Raise Ticket' }} 
      />
    </Tab.Navigator>
  );
}
