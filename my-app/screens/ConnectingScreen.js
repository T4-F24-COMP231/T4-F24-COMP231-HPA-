import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function ConnectingScreen({ route, navigation }) {
  const { selectedDevice } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      const isConnected = Math.random() > 0.5;
      navigation.navigate(isConnected ? 'ConnectionSuccess' : 'ConnectionFailure');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connecting to {selectedDevice}</Text>
      <ActivityIndicator size="large" color="#FF6347" />
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
    marginBottom: 20,
  },
});
