import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'background-image-url' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>John</Text>
        <Text style={styles.subtitle}>You are all Set</Text>
        <Button
          title="Let's Get Started"
          onPress={() => navigation.navigate('MetricsOverview')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { alignItems: 'center', marginTop: 100 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 18, color: '#fff', marginBottom: 20 },
});

export default WelcomeScreen;
