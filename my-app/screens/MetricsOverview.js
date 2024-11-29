import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const metrics = [
  { id: 1, title: 'Blood Pressure', value: '117/76', unit: 'SYS/DIA' },
  { id: 2, title: 'Heart Rate', value: '84', unit: 'bpm' },
  { id: 3, title: 'Steps', value: '8,000', unit: 'steps' },
];

const MetricsOverview = () => {
  const renderMetric = ({ item }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{item.title}</Text>
      <Text style={styles.metricValue}>
        {item.value} <Text style={styles.metricUnit}>{item.unit}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metrics Overview</Text>
      <FlatList
        data={metrics}
        renderItem={renderMetric}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  metricCard: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  metricTitle: { color: '#fff', fontSize: 18 },
  metricValue: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  metricUnit: { fontSize: 18 },
});

export default MetricsOverview;
