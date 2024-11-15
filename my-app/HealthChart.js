import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';

const HealthChart = ({ healthData }) => {
  const screenWidth = Dimensions.get('window').width;

 
  const labels = healthData.map((data, index) => {
 
    return index % Math.ceil(healthData.length / 5) === 0 
      ? data.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : '';
  });

  const bloodPressureData = healthData.map(data => data.bloodPressure);
  const glucoseLevelData = healthData.map(data => data.glucoseLevel);

  const data = {
    labels,
    datasets: [
      {
        data: bloodPressureData,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: glucoseLevelData,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      }
    ],
    legend: ['Blood Pressure', 'Glucose Level']
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>Health Metrics Over Time</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#f5a623',
          backgroundGradientFrom: '#ff7f50',
          backgroundGradientTo: '#ff6347',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
};

export default HealthChart;
