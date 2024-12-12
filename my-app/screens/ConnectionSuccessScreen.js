import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConnectionSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected Successfully!</Text>
      <Text style={styles.subtitle}>Your wearable device is now synced.</Text>
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.proceedButtonText}>Proceed to Home</Text>
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
  proceedButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
