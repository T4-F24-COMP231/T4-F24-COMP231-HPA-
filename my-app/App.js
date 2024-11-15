import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import HealthChart from './HealthChart';

export default function App() {
  const [bloodPressure, setBloodPressure] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [healthData, setHealthData] = useState([]);
  const [timeframe, setTimeframe] = useState('daily'); // Default timeframe

  const handleSubmit = () => {
    const newData = {
      bloodPressure: parseFloat(bloodPressure),
      glucoseLevel: parseFloat(glucoseLevel),
      date: new Date(),
    };
    setHealthData([...healthData, newData]);
    setBloodPressure('');
    setGlucoseLevel('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedData = {
        bloodPressure: Math.floor(60 + Math.random() * 40),
        glucoseLevel: Math.floor(70 + Math.random() * 50),
        date: new Date(),
      };
      setHealthData((prevData) => [...prevData, simulatedData]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter healthData based on selected timeframe
  const filterDataByTimeframe = () => {
    const now = new Date();
    return healthData.filter((data) => {
      const timeDiff = now - data.date;
      switch (timeframe) {
        case 'daily':
          return timeDiff <= 24 * 60 * 60 * 1000; // Last 24 hours
        case 'weekly':
          return timeDiff <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
        case 'monthly':
          return timeDiff <= 30 * 24 * 60 * 60 * 1000; // Last 30 days
        default:
          return true;
      }
    });
  };

  const filteredData = filterDataByTimeframe();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Progress App</Text>

      <TextInput
        placeholder="Blood Pressure"
        value={bloodPressure}
        onChangeText={setBloodPressure}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Glucose Level"
        value={glucoseLevel}
        onChangeText={setGlucoseLevel}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} color="#007BFF" />

      <View style={styles.toggleContainer}>
        {['daily', 'weekly', 'monthly'].map((frame) => (
          <TouchableOpacity
            key={frame}
            style={[
              styles.toggleButton,
              timeframe === frame && styles.activeToggleButton
            ]}
            onPress={() => setTimeframe(frame)}
          >
            <Text style={styles.toggleButtonText}>{frame.charAt(0).toUpperCase() + frame.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.recordedDataTitle}>Recorded Health Data:</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.recordedDataText}>{item.date.toLocaleString()} - BP: {item.bloodPressure}, Glucose: {item.glucoseLevel}</Text>
        )}
      />

      {/* Pass filtered data to Health Chart */}
      <HealthChart healthData={filteredData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#DDD',
  },
  activeToggleButton: {
    backgroundColor: '#4CAF50',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recordedDataTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  recordedDataText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
});
