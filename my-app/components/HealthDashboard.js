import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthDashboard = () => {
  const [metrics, setMetrics] = useState([
    { name: 'Blood Pressure', value: '117 SYS / 76 DIA / 42 PUL' },
    { name: 'Heart Rate', value: '84 bpm' },
    { name: 'Steps', value: '8,000 Steps' },
    { name: 'Oxygen Level', value: '98%' }, 
  ]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          if (metric.name === 'Heart Rate') {
            return { ...metric, value: `${Math.floor(Math.random() * 20 + 70)} bpm` };
          } else if (metric.name === 'Steps') {
            return { ...metric, value: `${parseInt(metric.value.replace(/[^0-9]/g, ''), 10) + Math.floor(Math.random() * 50)} Steps` };
          } else if (metric.name === 'Oxygen Level') {
            return { ...metric, value: `${Math.floor(Math.random() * 3 + 96)}%` }; // Randomize Oxygen Level
          }
          return metric;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Time Health Metrics</Text>
      {metrics.map((metric, index) => (
        <View key={index} style={styles.metric}>
          <Text style={styles.metricName}>{metric.name}</Text>
          <Text style={styles.metricValue}>{metric.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  metricName: {
    fontSize: 16,
    color: '#fff',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HealthDashboard;
