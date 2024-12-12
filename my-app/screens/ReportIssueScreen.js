import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

export default function ReportIssueScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if the form is being submitted
  const [titleError, setTitleError] = useState(false); // Tracks title validation
  const [descriptionError, setDescriptionError] = useState(false); // Tracks description validation

  const handleSubmit = async () => {
    // Reset validation errors
    setTitleError(false);
    setDescriptionError(false);

    // Validate fields
    if (!title) setTitleError(true);
    if (!description) setDescriptionError(true);
    if (!title || !description) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

    setIsSubmitting(true); // Start submission state

    try {
      const response = await fetch('http://192.168.0.213:5000/api/issues/report', { // Update IP if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your issue has been reported.');
        setTitle(''); // Clear form
        setDescription('');
        navigation.goBack(); // Navigate back
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to report issue.');
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false); // End submission state
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Technical Issue</Text>
      <TextInput
        style={[styles.input, titleError && styles.errorInput]} // Highlight input if there's an error
        placeholder="Issue Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (titleError) setTitleError(false); // Clear error when user starts typing
        }}
      />
      {titleError && <Text style={styles.errorText}>Title is required.</Text>} {/* Error message for title */}
      <TextInput
        style={[styles.input, styles.textArea, descriptionError && styles.errorInput]} // Highlight input if there's an error
        placeholder="Describe your issue in detail"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          if (descriptionError) setDescriptionError(false); // Clear error when user starts typing
        }}
        multiline
      />
      {descriptionError && <Text style={styles.errorText}>Description is required.</Text>} {/* Error message for description */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && { opacity: 0.5 }]} // Disable button during submission
        onPress={!isSubmitting ? handleSubmit : null}
        disabled={isSubmitting} // Disable button to prevent multiple submissions
      >
        {isSubmitting ? ( // Show loader when submitting
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorInput: {
    borderColor: '#FF6347',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF6347',
    fontSize: 14,
    marginBottom: 10,
  },
});
