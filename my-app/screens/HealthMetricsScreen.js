import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function HealthMetricsScreen() {
  const [metrics, setMetrics] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
   
    const simulatedMetrics = {
      timestamps: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'],
      heartRates: [70, 75, 80, 72, 78],
      steps: [1000, 1500, 2000, 1800, 2200],
      sleepHours: [6, 7, 6.5, 7.2, 6.8],
    };

    setTimeout(() => {
      setMetrics(simulatedMetrics);
    }, 1000); 
  }, []);

  if (!metrics) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Health Metrics...</Text>
      </View>
    );
  }

  const chartData = {
    labels: metrics.timestamps,
    datasets: [
      {
        data: metrics.heartRates,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: metrics.steps,
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: metrics.sleepHours,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Heart Rate', 'Steps', 'Sleep Hours'],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Metrics</Text>

      <LineChart
        data={chartData}
        width={Math.min(screenWidth - 40, 400)}
        height={220}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#333',
          backgroundGradientTo: '#444',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.metricsContainer}>
        <Text style={styles.metricText}>
          <Text style={styles.metricLabel}>Latest Heart Rate:</Text> {metrics.heartRates[metrics.heartRates.length - 1]} bpm
        </Text>
        <Text style={styles.metricText}>
          <Text style={styles.metricLabel}>Latest Steps Count:</Text> {metrics.steps[metrics.steps.length - 1]}
        </Text>
        <Text style={styles.metricText}>
          <Text style={styles.metricLabel}>Last Night's Sleep:</Text> {metrics.sleepHours[metrics.sleepHours.length - 1]} hours
        </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  metricsContainer: {
    marginTop: 20,
  },
  metricText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  metricLabel: {
    fontWeight: 'bold',
    color: '#FF6347',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});
