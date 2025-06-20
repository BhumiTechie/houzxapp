import { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { Feather } from '@expo/vector-icons';

export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Load data when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        try {
          const savedUser = await AsyncStorage.getItem('userData');
          if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setFirstName(parsed.firstName || '');
            setLastName(parsed.lastName || '');
            setPhone(parsed.phone || '');
          }
        } catch (e) {
          console.log('Error loading user data on focus:', e);
        }
      };

      loadUserData();
    }, [])
  );

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      phone,
      name: `${firstName} ${lastName}`,
    };

    try {
      setUser(updatedUser);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      Alert.alert('Success', 'Profile updated');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Details</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />

        <Text style={styles.label}>Last Name</Text>
        <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />

        <Text style={styles.label}>Phone</Text>
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#05141A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    paddingHorizontal: 20,
    height: 50,
  },
  headerText: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    zIndex: 1,
  },
  form: { padding: 20 },
  label: { color: '#999', fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  saveButton: {
    marginHorizontal: 20,
    backgroundColor: '#00A6A6',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 40,
  },
  saveText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
