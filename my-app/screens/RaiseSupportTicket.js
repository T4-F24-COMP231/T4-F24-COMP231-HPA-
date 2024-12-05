import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function RaiseSupportTicket() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: ''
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleAddTicket = () => {
    if (!newTicket.title || !newTicket.description) {
      Alert.alert('Error', 'Please fill out all fields for the new ticket.');
      return;
    }

    setTickets((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        ...newTicket,
      },
    ]);
    setNewTicket({ title: '', description: ''});
    setConfirmationMessage('New ticket raised successfully!');
  };

  const handleDeleteTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    setConfirmationMessage('Ticket deleted successfully!');
  };

  return (
    <View style={styles.container}>
      {/* Confirmation Message */}
      {confirmationMessage ? (
        <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>
      ) : null}

      {/* Tickets Section */}
      <Text style={styles.sectionTitle}>Raised Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketCard}>
            <View>
              <Text style={styles.ticketTitle}>{item.title}</Text>
              <Text style={styles.ticketDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteTicket(item.id)}
            >
              <Text style={styles.actionButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add New Ticket Section */}
      <Text style={styles.sectionTitle}>Raise a New Ticket</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newTicket.title}
        onChangeText={(text) => setNewTicket((prev) => ({ ...prev, title: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newTicket.description}
        onChangeText={(text) =>
          setNewTicket((prev) => ({ ...prev, description: text }))
        }
      />
      <TouchableOpacity style={styles.newTicketButton} onPress={handleAddTicket}>
        <Text style={styles.newTicketText}>Raise Ticket</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  profile: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmationMessage: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  ticketCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  ticketTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ticketDescription: {
    color: '#aaa',
    fontSize: 12,
  },
  actionButton: {
    color: '#FF6347',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  newTicketButton: {
    backgroundColor: '#FF6347',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 10,
  },
  newTicketText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
