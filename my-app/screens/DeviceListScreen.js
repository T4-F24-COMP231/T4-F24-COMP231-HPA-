import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function DeviceListScreen({ navigation }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const devices = [
    'John’s Watch',
    'Tobi’s Watch',
    'Arthur’s Watch',
    'Merina’s Watch',
    'Wilson’s Watch',
    'Femi’s Watch',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Device</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.deviceItem,
              selectedDevice === item && styles.selectedDevice,
            ]}
            onPress={() => setSelectedDevice(item)}
          >
            <Text style={styles.deviceText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.syncButton}
        onPress={() => navigation.navigate('Connecting', { selectedDevice })}
      >
        <Text style={styles.syncButtonText}>Sync Now</Text>
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
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  deviceItem: {
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedDevice: {
    backgroundColor: '#FF6347',
  },
  deviceText: {
    color: '#fff',
    fontSize: 16,
  },
  syncButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
