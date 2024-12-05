import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ITSupportDashboard = () => {
  const [tickets, setTickets] = useState([
    {
      id: '1',
      title: 'System Crash',
      description: 'The system crashes during login.',
      status: 'Open',
    },
    {
      id: '2',
      title: 'Printer Not Working',
      description: 'Printer is not responding to any commands.',
      status: 'In Progress',
    },
  ]);

  const [notifications, setNotifications] = useState([]);

  const handleUpdateStatus = (id, newStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );

    setNotifications((prev) => [
      ...prev,
      {
        id: new Date().getTime().toString(),
        message: `Ticket #${id} status updated to ${newStatus}`,
      },
    ]);

    Alert.alert('Success', `Ticket #${id} status updated to ${newStatus}`);
  };

  const renderTicket = ({ item }) => (
    <View style={styles.ticketCard}>
      <View>
        <Text style={styles.ticketTitle}>{item.title}</Text>
        <Text style={styles.ticketDescription}>{item.description}</Text>
        <Text style={styles.ticketStatus}>Status: {item.status}</Text>
      </View>
      <View style={styles.actions}>
        {item.status !== 'Closed' && (
          <>
            <TouchableOpacity
              onPress={() =>
                handleUpdateStatus(item.id, item.status === 'Open' ? 'In Progress' : 'Closed')
              }
            >
              <Text style={styles.actionButton}>
                {item.status === 'Open' ? 'Start' : 'Close'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tickets Section */}
      <Text style={styles.sectionTitle}>All Support Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={renderTicket}
      />

      {/* Notifications Section */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
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
  ticketStatus: {
    color: '#aaa',
    fontSize: 12,
  },
  actions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    color: '#FF6347',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  notificationCard: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  notificationMessage: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ITSupportDashboard;
