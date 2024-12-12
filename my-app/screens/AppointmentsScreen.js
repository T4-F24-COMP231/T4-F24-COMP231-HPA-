
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function AppointmentsScreen() {
  const navigation = useNavigation();
  const appointments = [

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([

    {
      id: '1',
      name: 'Reeves Keaunu',
      message: 'We will discuss further soon, John',
      date: '10/08/24',
      specialization: 'Dermatology',
    },
    {
      id: '2',
      name: 'Kevin Hart',
      message: "Kevin, I'll send you a picture soon",
      date: '10/08/24',
      specialization: 'Entomology',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    name: '',
    message: '',
    date: '',
    specialization: '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleAddAppointment = () => {
    if (!newAppointment.name || !newAppointment.date || !newAppointment.specialization) {
      Alert.alert('Error', 'Please fill out all fields for the new appointment.');
      return;
    }

    setAppointments((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        ...newAppointment,
      },
    ]);
    setNewAppointment({ name: '', message: '', date: '', specialization: '' });
    setConfirmationMessage('New appointment added successfully!');
  };

  const handleCancelAppointment = (id) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
    setConfirmationMessage('Appointment canceled successfully!');
  };

  const handleRescheduleAppointment = (id, newDate) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, date: newDate } : appointment
      )
    );
    setConfirmationMessage('Appointment rescheduled successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.watchName}>John's Watch</Text>
        <Text style={styles.profile}>JOHN J</Text>
      </View>

      {/* Confirmation Message */}
      {confirmationMessage ? (
        <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
      ) : null}

      {/* Appointments Section */}
      <Text style={styles.sectionTitle}>Appointments</Text> 
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <View>
              <Text style={styles.appointmentName}>{item.name}</Text>
              <Text style={styles.appointmentMessage}>{item.message}</Text>
              <Text style={styles.appointmentSpecialization}>
                {item.specialization}
              </Text>
            </View>
            <View style={styles.actions}>
              <Text style={styles.appointmentDate}>{item.date}</Text>
              <TouchableOpacity
                onPress={() => handleRescheduleAppointment(item.id, '12/12/24')}
              >
                <Text style={styles.actionButton}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancelAppointment(item.id)}>
                <Text style={styles.actionButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add New Appointment Section */}
      <Text style={styles.sectionTitle}>Add New Appointment</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newAppointment.name}
        onChangeText={(text) =>
          setNewAppointment((prev) => ({ ...prev, name: text }))
        }
      />


      {/* New Appointment Button */}
      <TouchableOpacity
        style={styles.newAppointmentButton}
        onPress={() => navigation.navigate('NewAppointment')}
      >
        <Text style={styles.newAppointmentText}>+ New Appointment</Text>

      <TextInput
        style={styles.input}
        placeholder="Message"
        value={newAppointment.message}
        onChangeText={(text) =>
          setNewAppointment((prev) => ({ ...prev, message: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 12/12/24)"
        value={newAppointment.date}
        onChangeText={(text) =>
          setNewAppointment((prev) => ({ ...prev, date: text }))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Specialization"
        value={newAppointment.specialization}
        onChangeText={(text) =>
          setNewAppointment((prev) => ({ ...prev, specialization: text }))
        }
      />
      <TouchableOpacity style={styles.newAppointmentButton} onPress={handleAddAppointment}>
        <Text style={styles.newAppointmentText}>Add Appointment</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  watchName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmationMessage: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  appointmentName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  appointmentMessage: {
    color: '#aaa',
    fontSize: 12,
  },
  appointmentSpecialization: {
    color: '#aaa',
    fontSize: 12,
  },
  appointmentDate: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    color: '#FF6347',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  newAppointmentButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  newAppointmentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
