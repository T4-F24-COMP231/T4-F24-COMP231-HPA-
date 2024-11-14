import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/health';

export default function App() {
  const [bloodPressure, setBloodPressure] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [healthData, setHealthData] = useState([]);

  // Function to submit health data
  const submitData = async () => {
    if (!bloodPressure || !glucoseLevel) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      await axios.post(`${API_URL}/add`, {
        patientId: '12345',
        bloodPressure,
        glucoseLevel,
      });
      Alert.alert('Success', 'Health data saved successfully');  // Confirmation message for saved data
      fetchData(); // Refresh the data after submitting
      setBloodPressure('');
      setGlucoseLevel('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      Alert.alert('Success', 'Health data deleted successfully');  // Confirmation message for deleted data
      fetchData(); // Refresh the data after deleting
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete data');
    }
  };
  
  

  // Function to fetch health data
  const fetchData = async () => {
    try {
      const response = await axios.get($,{API_URL}/all);
      setHealthData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data when the app loads
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Progress App</Text>

      <TextInput
        style={styles.input}
        placeholder="Blood Pressure"
        value={bloodPressure}
        onChangeText={setBloodPressure}
      />
      <TextInput
        style={styles.input}
        placeholder="Glucose Level"
        value={glucoseLevel}
        onChangeText={setGlucoseLevel}
      />

      <Button title="Submit" onPress={submitData} />

      <Text style={styles.sectionTitle}>Recorded Health Data:</Text>
      <FlatList
        data={healthData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
        <View style={styles.listItem}>
      <Text>
        {item.patientId}: BP - {item.bloodPressure}, Glucose - {item.glucoseLevel}
      </Text>
          <Button
            title="Delete"
            onPress={() => deleteData(item._id)}  // Call deleteData with the item's ID
          />
        </View>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
});