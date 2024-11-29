import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen'; // Adjust path as necessary
import MetricsOverview from '../screens/MetricsOverview'; // Adjust path as necessary
import HealthMetricsScreen from '../screens/HealthMetricsScreen'; // Adjust path as necessary

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
          headerTitle: 'Health Metrics',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="HealthMetrics"
        component={HealthMetricsScreen}
        options={{
          headerTitle: 'Health Progress',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
