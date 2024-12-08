import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConnectionFailureScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connection Failed</Text>
      <Text style={styles.subtitle}>
        Unable to connect to your device. Please try again.
      </Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => navigation.navigate('DeviceList')}
      >
        <Text style={styles.retryButtonText}>Try Again</Text>
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
  retryButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
