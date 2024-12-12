import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SyncIntroScreen({ navigation }) {
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

      {/* Navigate to Device List for Registration */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('DeviceList')} // Navigate to list of available devices
      >
        <Text style={styles.registerButtonText}>Sync Device</Text>
      </TouchableOpacity>

      {/* Navigate to Device List */}
      <TouchableOpacity
        style={styles.deviceListButton}
        onPress={() => navigation.navigate('DeviceList')} // Navigate to the same list of devices
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
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
