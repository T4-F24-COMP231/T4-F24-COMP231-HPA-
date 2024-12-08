import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function MessagingScreen({ chats }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => navigation.navigate('ChatScreen', { name: item.name, id: item.id })}
          >
            <View>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.chatTimestamp}>{item.timestamp}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewMessage')}
      >
        <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  chatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#aaa',
  },
  chatTimestamp: {
    fontSize: 12,
    color: '#aaa',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6347',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
