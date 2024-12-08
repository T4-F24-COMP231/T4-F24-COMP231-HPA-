import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <View style={styles.watchSection}>
          <Image
            source={require('../assets/watch.png')} 
            style={styles.watchIcon}
          />
          <Text style={styles.watchName}>John's Watch</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>J</Text> 
          </View>
        </TouchableOpacity>
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
  watchSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  watchName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6347', // Use your preferred color
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
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
