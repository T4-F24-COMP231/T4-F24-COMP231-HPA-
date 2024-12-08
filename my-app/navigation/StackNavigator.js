import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import MetricsOverview from '../screens/MetricsOverview';
import HealthMetricsScreen from '../screens/HealthMetricsScreen';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MetricsOverview"
        component={MetricsOverview}
        options={{ headerTitle: 'Health Metrics' }}
      />
      <Stack.Screen
        name="HealthMetrics"
        component={HealthMetricsScreen}
        options={{ headerTitle: 'Health Progress' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
        }}
      />

    </Stack.Navigator>
  );
}
