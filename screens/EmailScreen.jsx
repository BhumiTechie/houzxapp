import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator, // For loading indicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; // Importing user context

// Custom message display component (copied from VerifyOtpScreen for consistency)
const MessageDisplay = ({ message, type, onClose }) => {
  if (!message) return null;

  const backgroundColor = type === 'error' ? '#FFDDDD' : '#D4EDDA';
  const textColor = type === 'error' ? '#721C24' : '#155724';

  return (
    <View style={[messageStyles.container, { backgroundColor }]}>
      <Text style={[messageStyles.text, { color: textColor }]}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={messageStyles.closeButton}>
        <Feather name="x" size={20} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

const messageStyles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  text: {
    flex: 1,
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
  },
});


export default function EmailScreen() {
  const navigation = useNavigation();
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [message, setMessage] = useState(''); // State for custom message
  const [messageType, setMessageType] = useState(''); // State for message type

  const { user } = useUser();
  const { width } = Dimensions.get('window');
  const gap = 30; // define a margin gap for spacing

  // Function to show custom message
  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000); // Hide message after 3 seconds
  };
  
const handleSendOtp = async () => {
  if (!newEmail || !newEmail.includes('@') || !newEmail.includes('.')) {
    showMessage('Invalid Email: Please enter a valid email address (e.g., example@domain.com).', 'error');
    return;
  }

  setIsLoading(true);
  showMessage('Sending OTP...', 'info');

  try {
    const response = await fetch('http://192.168.102.141:5000/auth/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(`OTP sent to ${newEmail}.`, 'info');
      navigation.navigate('VerifyOtpScreen', { newEmail });
    } else {
      showMessage(data.message || 'Failed to send OTP', 'error');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    showMessage('Failed to send OTP. Please try again.', 'error');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <MessageDisplay
        message={message}
        type={messageType}
        onClose={() => setMessage('')}
      />

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
            editable={!isLoading} // Disable input while loading
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSendOtp}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Continue</Text>
          )}
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
