import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SyncIntroScreen({ navigation }) {
  const [syncStatus, setSyncStatus] = useState('Not Synced');

  const handleSync = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/syncWearable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '12345',
          heartRate: 80,
          steps: 10000,
          sleepHours: 7,
        }),
      });

      if (response.ok) {
        setSyncStatus('Sync successful!');
      } else {
        setSyncStatus('Sync failed.');
      }
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('Error syncing data.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Add Watch Image */}
      <Image
        source={require('../assets/watch.png')}
        style={styles.watchImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sync Wearable</Text>
      <Text style={styles.subtitle}>
        Before jumping into it, we suggest you set up your wearable device.
      </Text>

      {/* Sync Now Button */}
      <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
        <Text style={styles.syncButtonText}>Sync Now</Text>
      </TouchableOpacity>

      {/* Sync Status */}
      <Text style={styles.syncStatus}>{syncStatus}</Text>

      {/* Navigate to Device List */}
      <TouchableOpacity
        style={styles.deviceListButton}
        onPress={() => navigation.navigate('DeviceList')}
      >
        <Text style={styles.deviceListButtonText}>View Devices</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  watchImage: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 20, // Add spacing between the image and text
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  syncButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  syncStatus: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  deviceListButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  deviceListButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
