import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function MessageListScreen({ navigation }) {
  const messages = [
    {
      id: '1',
      name: 'Daniel Pinto',
      apartment: 'Apartment Name',
      message: 'Message Display here',
      time: '10:50 AM',
      // image: require('../assets/user1.png'), // Replace with your image
      unread: true,
    },
    {
      id: '2',
      name: 'Lorem Ipsum',
      apartment: 'Apartment Name',
      message: 'Message Display here',
      time: '10:50 AM',
      // image: require('../assets/user2.png'),
      unread: false, 
    },
    {
      id: '3',
      name: 'Lorem Ipsum',
      apartment: 'Apartment Name',
      message: 'Message Display here',
      time: '10:50 AM',
      // image: require('../assets/user3.png'),
      unread: false,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageCard}
      onPress={() => navigation.navigate('ChatScreen', { user: item })}
    >
      <Image source={item.image} style={styles.avatar} />

      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.apartment}>{item.apartment}</Text>
        <Text style={styles.preview}>{item.message}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    backgroundColor: '#05141A',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#05141A',
  },
  apartment: {
    color: '#666',
    fontSize: 13,
  },
  preview: {
    color: '#999',
    fontSize: 13,
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00C3FF',
    marginTop: 6,
  },
});
