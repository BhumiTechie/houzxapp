import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setUser } = useUser(); // We only need setUser here to update the context

  // Load existing profile data (firstName, lastName) if available when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('userData');
        if (saved) {
          const parsed = JSON.parse(saved);
          setFirstName(parsed.firstName || '');
          setLastName(parsed.lastName || '');
          console.log('ProfileScreen: Pre-filled with existing name data:', parsed); // Debug log
        }
      } catch (e) {
        console.log('Error loading profile data for pre-fill:', e);
      }
    };
    loadData();
  }, []);

  const handleContinue = async () => {
    const fullName = `${firstName} ${lastName}`.trim();

    if (!firstName || !lastName) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    // --- CRUCIAL FIX: Load existing user data first ---
    let existingUserData = {};
    try {
      const saved = await AsyncStorage.getItem('userData');
      if (saved) {
        existingUserData = JSON.parse(saved);
        console.log('ProfileScreen: Existing user data loaded BEFORE MERGE:', existingUserData); // Debug
      } else {
        console.log('ProfileScreen: No existing user data found, starting name fresh.'); // Debug
      }
    } catch (e) {
      console.error('Error loading existing user data in ProfileScreen for merge:', e);
    }

    // Create the updated user data object by merging existing data with new name
    const updatedUserData = {
      ...existingUserData, // <-- THIS IS THE KEY: Spreads (copies) existing properties (like email, phone)
      firstName,           // <-- These add/overwrite new properties
      lastName,
      name: fullName,      // <-- This is the full name to display on AccountScreen
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUser(updatedUserData); // Update the UserContext with the merged data

      console.log('ProfileScreen: User data SAVED AFTER MERGE:', updatedUserData); // Debug
      navigation.navigate('HomeScreen'); // Navigate to your main app screen
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      console.error('Error saving userData in ProfileScreen:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>Upload Photo</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  topBar: {
    height: 54,
    backgroundColor: '#05141A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topBarTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#009CA0',
    borderRadius: 8,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});