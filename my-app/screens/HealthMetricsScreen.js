// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
// import HealthChart from '../components/HealthChart'; 

// export default function HealthMetricsScreen() {
//   const [bloodPressure, setBloodPressure] = useState('');
//   const [glucoseLevel, setGlucoseLevel] = useState('');
//   const [healthData, setHealthData] = useState([]);
//   const [timeframe, setTimeframe] = useState('daily'); // Default timeframe

//   // Detect system theme for light/dark mode support
//   const isDarkMode = useColorScheme() === 'dark';
//   const backgroundColor = isDarkMode ? '#333' : '#F5F5F5';
//   const textColor = isDarkMode ? '#FFF' : '#333';

//   const handleSubmit = () => {
//     if (!bloodPressure || isNaN(bloodPressure) || !glucoseLevel || isNaN(glucoseLevel)) {
//       alert('Please enter valid numeric values for both fields.');
//       return;
//     }

//     const newData = {
//       bloodPressure: parseFloat(bloodPressure),
//       glucoseLevel: parseFloat(glucoseLevel),
//       date: new Date(),
//     };

//     setHealthData([...healthData, newData]);
//     setBloodPressure('');
//     setGlucoseLevel('');
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const simulatedData = {
//         bloodPressure: Math.floor(60 + Math.random() * 40),
//         glucoseLevel: Math.floor(70 + Math.random() * 50),
//         date: new Date(),
//       };

//       setHealthData((prevData) => {
//         const updatedData = [...prevData, simulatedData];
//         return updatedData.length > 100 ? updatedData.slice(-100) : updatedData;
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Filter health data based on selected timeframe
//   const filterDataByTimeframe = () => {
//     const now = new Date();
//     return healthData.filter((data) => {
//       const timeDiff = now - data.date;
//       switch (timeframe) {
//         case 'daily':
//           return timeDiff <= 24 * 60 * 60 * 1000; // Last 24 hours
//         case 'weekly':
//           return timeDiff <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
//         case 'monthly':
//           return timeDiff <= 30 * 24 * 60 * 60 * 1000; // Last 30 days
//         default:
//           return true;
//       }
//     });
//   };

//   const filteredData = filterDataByTimeframe();

//   return (
//     <View style={[styles.container, { backgroundColor }]}>
//       <Text style={[styles.title, { color: textColor }]}>Health Progress App</Text>

//       <TextInput
//         placeholder="Blood Pressure"
//         value={bloodPressure}
//         onChangeText={setBloodPressure}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholderTextColor="#888"
//       />

//       <TextInput
//         placeholder="Glucose Level"
//         value={glucoseLevel}
//         onChangeText={setGlucoseLevel}
//         keyboardType="numeric"
//         style={styles.input}
//         placeholderTextColor="#888"
//       />

//       <Button title="Submit" onPress={handleSubmit} color="#007BFF" />

//       <View style={styles.toggleContainer}>
//         {['daily', 'weekly', 'monthly'].map((frame) => (
//           <TouchableOpacity
//             key={frame}
//             style={[
//               styles.toggleButton,
//               timeframe === frame && styles.activeToggleButton
//             ]}
//             onPress={() => setTimeframe(frame)}
//           >
//             <Text style={styles.toggleButtonText}>
//               {frame.charAt(0).toUpperCase() + frame.slice(1)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={[styles.recordedDataTitle, { color: textColor }]}>
//         Recorded Health Data:
//       </Text>

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Text style={[styles.recordedDataText, { color: textColor }]}>
//             {item.date.toLocaleString()} - BP: {item.bloodPressure}, Glucose: {item.glucoseLevel}
//           </Text>
//         )}
//       />

//       <HealthChart healthData={filteredData} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // Styles remain the same
// });
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const API_URL = 'http://localhost:5000/api/healthMetrics';

export default function HealthMetricsScreen() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  const fetchMetrics = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.loadingText}>Loading Health Metrics...</Text>
      </View>
    );
  }

  if (!metrics) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load health metrics.</Text>
      </View>
    );
  }

  const chartData = {
    labels: metrics.timestamps, // Time labels from the data
    datasets: [
      {
        data: metrics.heartRates, // Heart rate data points
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: metrics.steps, // Steps data points
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: metrics.sleepHours, // Sleep hours data points
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#FF6347',
    fontSize: 16,
  },
});
