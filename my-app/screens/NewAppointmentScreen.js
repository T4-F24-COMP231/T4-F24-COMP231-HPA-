import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

export default function NewAppointmentScreen() {
  const [specialists] = useState([
    { id: '1', name: 'Dr. Reeves Keanu', specialization: 'Dermatology' },
    { id: '2', name: 'Dr. Kevin Hart', specialization: 'Entomology' },
    { id: '3', name: 'Dr. Lebron James', specialization: 'Optomology' },
    { id: '4', name: 'Dr. Kevin Durant', specialization: 'Radiology' },
    { id: '5', name: 'Dr. Antony Edwards', specialization: 'Therapist' },
  ]);
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [appointmentType, setAppointmentType] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateAppointment = async () => {
    if (!specialist || !date.day || !date.month || !date.year || !appointmentType) {
      return Alert.alert('Error', 'Please fill in all the fields.');
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '648d82cfd9e5e1f32bfe67a3', // Replace with dynamic user ID
          providerId: specialist,
          date: `${date.day}/${date.month}/${date.year}`,
          time: '10:00 AM', // Static for now, can be made dynamic
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Appointment created successfully!');
      } else {
        Alert.alert('Error', 'Failed to create appointment. Try again.');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      Alert.alert('Error', 'An error occurred. Try again.');
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.watchName}>John's Watch</Text>
        <Text style={styles.profile}>JOHN J</Text>
      </View>

      <Text style={styles.title}>New Appointment</Text>

      {/* Specialist Picker */}
      <Text style={styles.label}>Select your specialist</Text>
      <Picker
        selectedValue={specialist}
        onValueChange={(itemValue) => setSpecialist(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose a Specialist" value="" />
        {specialists.map((s) => (
          <Picker.Item key={s.id} label={s.name} value={s.id} />
        ))}
      </Picker>

      {/* Date Input */}
      <Text style={styles.label}>When works for you</Text>
      <View style={styles.dateContainer}>
        <TextInput
          placeholder="DD"
          value={date.day}
          onChangeText={(text) => setDate({ ...date, day: text })}
          keyboardType="numeric"
          style={styles.dateInput}
        />
        <TextInput
          placeholder="MM"
          value={date.month}
          onChangeText={(text) => setDate({ ...date, month: text })}
          keyboardType="numeric"
          style={styles.dateInput}
        />
        <TextInput
          placeholder="YYYY"
          value={date.year}
          onChangeText={(text) => setDate({ ...date, year: text })}
          keyboardType="numeric"
          style={styles.dateInput}
        />
      </View>

      {/* Appointment Type Picker */}
      <Text style={styles.label}>What Type Works Best?</Text>
      <Picker
        selectedValue={appointmentType}
        onValueChange={(itemValue) => setAppointmentType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose Appointment Type" value="" />
        <Picker.Item label="Online Consultation" value="Online Consultation" />
        <Picker.Item label="In-Person" value="In-Person" />
      </Picker>

      {/* Location Input */}
      <Text style={styles.label}>Your Location</Text>
      <TextInput
        placeholder="Address"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Your Location"
        />
      </MapView>

      {/* Create Appointment Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAppointment}>
        <Text style={styles.createButtonText}>Create Your Appointment</Text>
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
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    backgroundColor: '#222',
    color: '#fff',
    width: '30%',
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  map: {
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
