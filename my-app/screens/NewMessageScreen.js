import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const doctors = [
  { id: '1', name: 'Dr. Reeves Keanu', specialization: 'Dermatology' },
  { id: '2', name: 'Dr. Kevin Hart', specialization: 'Entomology' },
  { id: '3', name: 'Dr. Lebron James', specialization: 'Optomology' },
  { id: '4', name: 'Dr. Kevin Durant', specialization: 'Radiology' },
  { id: '5', name: 'Dr. Antony Edwards', specialization: 'Therapist' },
];

export default function NewMessageScreen({ navigation, addNewChat }) {
  const startChat = (doctor) => {
    addNewChat(doctor);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a New Message</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorCard}
            onPress={() => startChat(item)}
          >
            <View>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorSpecialization}>{item.specialization}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  doctorCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#aaa',
  },
});
