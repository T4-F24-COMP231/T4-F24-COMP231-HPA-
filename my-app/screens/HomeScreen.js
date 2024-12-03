import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.watchName}>John's Watch</Text>
        <Text style={styles.profile}>JOHN J</Text>
      </View>

      {/* Metrics Overview */}
      <Text style={styles.sectionTitle}>Metrics</Text>
      <View style={styles.metricsContainer}>
        {/* Blood Pressure */}
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Blood Pressure</Text>
          <Text style={styles.metricValue}>117 SYS / 76 DIA / 42 PUL</Text>
        </View>

        {/* Heart Rate */}
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Heart Rate</Text>
          <Text style={styles.metricValue}>84 bpm</Text>
        </View>

        {/* Steps Taken */}
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Steps</Text>
          <Text style={styles.metricValue}>8,000 Steps</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  watchName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metricsContainer: {
    flexDirection: 'column',
    gap: 20,
  },
  metricCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  metricTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  

});
