import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from '../context/UserContext';
import { Feather } from '@expo/vector-icons';

export default function AccountScreen() {
  const { user } = useUser();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user?.profilePic }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      {/* Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="user" size={20} />
            <Text style={styles.label}>Personal Details</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="list" size={20} />
            <Text style={styles.label}>My Ads</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="mail" size={20} />
            <Text style={styles.label}>Change Email</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="lock" size={20} />
            <Text style={styles.label}>Change Password</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="trash" size={20} />
            <Text style={styles.label}>Delete Account</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="file-text" size={20} />
            <Text style={styles.label}>Terms & Conditions</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="shield" size={20} />
            <Text style={styles.label}>Privacy Policy</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="share-2" size={20} />
            <Text style={styles.label}>Share App</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="log-out" size={20} />
            <Text style={styles.label}>Sign Out</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#05141A', padding: 20 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  profileSection: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666' },
  section: { paddingHorizontal: 20, paddingTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: { fontSize: 14 },
});
