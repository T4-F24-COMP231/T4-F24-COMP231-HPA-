import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import HealthChart from '../components/HealthChart'; 

export default function HealthMetricsScreen() {
  const [bloodPressure, setBloodPressure] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [healthData, setHealthData] = useState([]);
  const [timeframe, setTimeframe] = useState('daily'); // Default timeframe

  // Detect system theme for light/dark mode support
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? '#333' : '#F5F5F5';
  const textColor = isDarkMode ? '#FFF' : '#333';

  const handleSubmit = () => {
    if (!bloodPressure || isNaN(bloodPressure) || !glucoseLevel || isNaN(glucoseLevel)) {
      alert('Please enter valid numeric values for both fields.');
      return;
    }

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

      setHealthData((prevData) => {
        const updatedData = [...prevData, simulatedData];
        return updatedData.length > 100 ? updatedData.slice(-100) : updatedData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter health data based on selected timeframe
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
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Health Progress App</Text>

      <TextInput
        placeholder="Blood Pressure"
        value={bloodPressure}
        onChangeText={setBloodPressure}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Glucose Level"
        value={glucoseLevel}
        onChangeText={setGlucoseLevel}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#888"
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
            <Text style={styles.toggleButtonText}>
              {frame.charAt(0).toUpperCase() + frame.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.recordedDataTitle, { color: textColor }]}>
        Recorded Health Data:
      </Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={[styles.recordedDataText, { color: textColor }]}>
            {item.date.toLocaleString()} - BP: {item.bloodPressure}, Glucose: {item.glucoseLevel}
          </Text>
        )}
      />

      <HealthChart healthData={filteredData} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles remain the same
});
