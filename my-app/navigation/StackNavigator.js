import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen'; 
import MetricsOverview from '../screens/MetricsOverview'; 
import HealthMetricsScreen from '../screens/HealthMetricsScreen'; 
import HealthDashboard from '../components/HealthDashboard'; 

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MetricsOverview"
        component={MetricsOverview}
        options={{
          headerTitle: 'Metrics Overview',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="HealthMetrics"
        component={HealthMetricsScreen}
        options={{
          headerTitle: 'Health Metrics',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="HealthDashboard"
        component={HealthDashboard}
        options={{
          headerTitle: 'Health Dashboard',
          headerStyle: { backgroundColor: '#FF6347' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
