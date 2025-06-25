import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; // Importing user context

export default function EmailScreen() {
  const navigation = useNavigation();
  const [newEmail, setNewEmail] = useState('');
  const { user, updateUser } = useUser();
  const { width } = Dimensions.get('window');
  const gap = 30; // define a margin gap for spacing

  const handleSave = () => {
    if (!newEmail || !newEmail.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Update user email
    updateUser({ ...user, email: newEmail });
    Alert.alert('Success', 'Your email has been updated.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Email</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <View style={styles.content}>
        <Text style={styles.infoText}>
          Any enquiries you’ve sent before changing your email will go to your old email address.
        </Text>

        <Text style={styles.label}>Current Email</Text>
        <Text style={styles.currentEmail}>{user?.email || 'Not Available'}</Text>

        {/* Email Input */}
        <View style={[styles.inputWrapper, { width: width - 40, marginTop: gap }]}>
          <Text style={styles.floatingLabel}>New Email</Text>
          <TextInput
            style={styles.floatingInput}
            placeholder="Enter new email"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={newEmail}
            onChangeText={setNewEmail}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#5E5E5E',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#5E5E5E',
    marginTop: 12,
  },
  currentEmail: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 4,
    color:'#222222'
  },
  saveButton: {
    backgroundColor: '#009CA0',
    padding: 14,
    borderRadius: 8,
    marginTop: 28,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputWrapper: {
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    marginTop: 28,
    marginBottom: 20,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 13,
    color: '#333',
    zIndex: 1,
  },
  floatingInput: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.5,
    lineHeight: 19,
    color: '#000',
    height: 50,
    paddingTop: 14,
    textAlignVertical: 'center',
  },
});
