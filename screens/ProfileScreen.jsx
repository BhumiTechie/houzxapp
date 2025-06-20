import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const { setUser, refreshUser } = useUser();
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!firstName || !lastName || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const email = await AsyncStorage.getItem('userEmail');

      const profileData = {
        firstName,
        lastName,
        phone,
        email,
        name: `${firstName} ${lastName}`,
        profilePic: `https://i.pravatar.cc/150?u=${email}`,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(profileData));
      setUser(profileData);           // Update context
      await refreshUser();            // Reload context from AsyncStorage

      Alert.alert('Success', 'Profile saved successfully');
      navigation.navigate('HomeScreen');  // Or 'AccountScreen'
    } catch (e) {
      Alert.alert('Error', 'Failed to save profile');
      console.log('Save error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
        style={styles.input}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
        style={styles.input}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#009CA0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
