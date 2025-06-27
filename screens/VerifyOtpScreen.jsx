import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  TextInput, // Use regular input instead
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

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

export default function VerifyOtpScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { newEmail } = route.params || {};
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useUser();

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    if (!newEmail) {
      showMessage('No email found. Returning to previous screen.', 'error');
      setTimeout(() => navigation.goBack(), 1000);
    }
  }, [newEmail, navigation]);

const handleVerify = async () => {
  if (otp.length !== 4) {
    showMessage('Invalid OTP. Please enter the complete 4-digit code.', 'error');
    return;
  }

  setIsLoading(true);
  showMessage('Verifying OTP...', 'info');

  try {
    const response = await fetch('http://192.168.102.141:5000/api/otp/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail, otp }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('OTP verified successfully!', 'info');
      if (updateUser) updateUser({ email: newEmail });
      setTimeout(() => navigation.navigate('ChangePasswordScreen', { newEmail }), 500);
    } else {
      showMessage(data.message || 'Incorrect OTP. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    showMessage('Failed to verify OTP. Please try again.', 'error');
  } finally {
    setIsLoading(false);
  }
};


const handleResend = async () => {
  setIsLoading(true);
  showMessage('Resending OTP...', 'info');
  try {
    const response = await fetch('http://192.168.102.141:5000/api/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(`OTP has been resent to ${newEmail}`, 'info');
    } else {
      showMessage(data.message || 'Failed to resend OTP.', 'error');
    }
  } catch (error) {
    console.error('Error resending OTP:', error);
    showMessage('Failed to resend OTP. Please try again.', 'error');
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

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify OTP</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          We’ve sent an OTP to <Text style={{ fontWeight: 'bold' }}>{newEmail || 'your email'}</Text>
        </Text>

        {/* Replace OTPInputView with a regular TextInput */}
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          maxLength={4}
          onChangeText={setOtp}
          value={otp}
          placeholder="Enter 4-digit OTP"
        />

        <TouchableOpacity onPress={handleResend} style={styles.resendButton} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.resendText}>
              Didn’t receive an OTP? <Text style={{ fontWeight: '600' }}>Resend</Text>
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
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
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 18,
    paddingHorizontal: 15,
    backgroundColor: '#F7F7F7',
    textAlign: 'center',
    marginBottom: 10,
  },
  resendButton: {
    marginTop: 12,
    paddingVertical: 5,
  },
  resendText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#009CA0',
    paddingVertical: 14,
    width: '80%',
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
