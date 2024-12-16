import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const handleReportIssue = () => {
    navigation.navigate('ReportIssueScreen'); 
  };

  const handleHelp = () => {
    const guideUrl = 'https://www.dropbox.com/scl/fi/slx9r4l98pvejau1lq60s/User-Guide-for-Health-Progress-App.docx?rlkey=1xtq12sv0hvs539t9jkummkav&st=5zjgw024&dl=0'; 

   
    Linking.canOpenURL(guideUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(guideUrl); 
        } else {
          Alert.alert('Error', 'Unable to open the guide. Please try again later.');
        }
      })
      .catch((err) => console.error('Error opening guide:', err));
  };


  return (
    <ScrollView style={styles.container}>

      <View style={styles.infoSection}>
        <Text style={styles.title}>John J's Profile</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John J</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>johnj@example.com</Text>

        <Text style={styles.label}>Linked Devices:</Text>
        <Text style={styles.value}>Apple Watch Series 7</Text>

        <Text style={styles.label}>App Version:</Text>
        <Text style={styles.value}>1.0.0</Text>
      </View>

   
      <View style={styles.metricsSection}>
        <Text style={styles.sectionTitle}>Metrics Overview</Text>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Blood Pressure</Text>
          <Text style={styles.metricValue}>117 SYS / 76 DIA / 42 PUL</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Heart Rate</Text>
          <Text style={styles.metricValue}>84 bpm</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Steps Taken</Text>
          <Text style={styles.metricValue}>8,000 Steps</Text>
        </View>
      </View>

     
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.optionButton} onPress={handleHelp}>
          <Text style={styles.optionText}>Help / How to Use the App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={handleReportIssue}>
          <Text style={styles.optionText}>Report Technical Issues</Text>
        </TouchableOpacity>
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
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 30,
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  metricsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  buttonSection: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
