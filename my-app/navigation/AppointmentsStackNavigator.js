import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import NewAppointmentScreen from '../screens/NewAppointmentScreen';

const AppointmentsStack = createStackNavigator();

export default function AppointmentsStackNavigator() {
  return (
    <AppointmentsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <AppointmentsStack.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ headerTitle: 'Appointments' }}
      />
      <AppointmentsStack.Screen
        name="NewAppointment"
        component={NewAppointmentScreen}
        options={{ headerTitle: 'New Appointment' }}
      />
    </AppointmentsStack.Navigator>
  );
}
