import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function AppointmentsScreen() {
  const navigation = useNavigation();
  const appointments = [
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
  ];

  const professionals = [
    { id: '1', name: 'Reeves Keaunu', specialization: 'Dermatology' },
    { id: '2', name: 'Kevin Gates', specialization: 'Entomology' },
    { id: '3', name: 'Lebron James', specialization: 'Optomology' },
    { id: '4', name: 'Kevin Durant', specialization: 'Radiology' },
    { id: '5', name: 'Antony Edwards', specialization: 'Therapist' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.watchName}>John's Watch</Text>
        <Text style={styles.profile}>JOHN J</Text>
      </View>

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
            </View>
            <Text style={styles.appointmentDate}>{item.date}</Text>
          </View>
        )}
        ListHeaderComponent={<Text style={styles.subHeader}>Upcoming</Text>}
      />

      {/* Professionals Section */}
      <Text style={styles.sectionTitle}>Your Professionals</Text>
      <FlatList
        data={professionals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.professionalCard}>
            <Text style={styles.professionalName}>{item.name}</Text>
            <Text style={styles.professionalSpecialization}>{item.specialization}</Text>
          </View>
        )}
      />

      {/* New Appointment Button */}
      <TouchableOpacity
        style={styles.newAppointmentButton}
        onPress={() => navigation.navigate('NewAppointment')}
      >
        <Text style={styles.newAppointmentText}>+ New Appointment</Text>
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
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  subHeader: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
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
  appointmentDate: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  professionalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  professionalName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  professionalSpecialization: {
    color: '#aaa',
    fontSize: 12,
  },
  newAppointmentButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
  },
  newAppointmentText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
