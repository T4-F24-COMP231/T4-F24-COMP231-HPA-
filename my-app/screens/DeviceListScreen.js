import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';

export default function DeviceListScreen() {
  const [availableDevices, setAvailableDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevices = async () => {
    try {
        const response = await fetch('http://10.0.2.2:5001/api/devices/discoverDevices');
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }
        const data = await response.json();
        setAvailableDevices(data.devices);
        setModalVisible(true); // Open the modal only after fetching devices
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
};

  

const registerDevice = async (deviceId) => {
  try {
    const response = await fetch('http://10.0.2.2:5000/api/devices/registerDevice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: '648d82cfd9e5e1f32bfe67a3', // Replace with dynamic userId
        deviceId,
      }),
    });

    if (response.ok) {
      alert('Device registered successfully!');
      setSelectedDevice(null);
      setModalVisible(false);
    } else {
      const errorData = await response.json();
      alert(errorData.error || 'Failed to register device.');
    }
  } catch (error) {
    console.error('Error registering device:', error);
    alert('Error registering device. Try syncing again.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sync Device</Text>

      {/* Register Device Button */}
      <TouchableOpacity style={styles.registerButton} onPress={fetchDevices}>
        <Text style={styles.registerButtonText}>Discover Devices</Text>
      </TouchableOpacity>

      {/* Modal for Device Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Device to Register</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FF6347" />
          ) : (
<FlatList
  data={availableDevices}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.deviceItem,
        item.compatible ? styles.compatibleDevice : styles.incompatibleDevice,
      ]}
      onPress={() => setSelectedDevice(item.id)}
    >
      <Text style={styles.deviceText}>
        {item.name} {item.compatible ? '' : '(Incompatible)'}
      </Text>
    </TouchableOpacity>
  )}
/>

          )}
          {selectedDevice && (
            <TouchableOpacity
              style={styles.syncButton}
              onPress={() => registerDevice(selectedDevice)}
            >
              <Text style={styles.syncButtonText}>Sync </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deviceItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '80%',
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
    width: '80%',
    marginTop: 20,
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
  },
  closeModalText: {
    color: '#fff',
    fontSize: 14,
  },
});
