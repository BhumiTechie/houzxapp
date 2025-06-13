import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const { width } = Dimensions.get('window');

const OTPScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const inputRefs = useRef([]);

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }

    try {
      console.log('🔐 Sending OTP verification:', { phoneNumber, otp: enteredOtp });

      const response = await axios.post(
        'http://192.168.36.141:5000/auth/verify-otp',
        { phoneNumber, otp: enteredOtp },
        { timeout: 10000 }
      );

      console.log('✅ Backend response:', response.data);

      if (response.data.success) {
        alert('OTP Verified!');
        navigation.navigate('ResetPasswordScreen', { phoneNumber });
      } else {
        setError(response.data.message || 'Verification failed.');
      }
    } catch (err) {
      console.error('❌ Verify OTP error:', err?.message);
      setError(err?.response?.data?.message || 'Network error verifying OTP');
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOTP = async () => {
    setIsResendDisabled(true);
    setResendMessage('');
    setError('');

    try {
      const response = await axios.post(
        'http://192.168.36.141:5000/auth/resend-otp',
        { phoneNumber },
        { timeout: 10000 }
      );

      console.log('📨 Resend OTP response:', response.data);

      if (response.data.success) {
        setResendMessage('OTP has been resent successfully.');
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setResendMessage(response.data.message || 'Could not resend OTP');
      }
    } catch (err) {
      console.error('❌ Resend OTP error:', err?.message);
      setResendMessage('Network error resending OTP');
    } finally {
      setTimeout(() => setIsResendDisabled(false), 30000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#05141A" barStyle="light-content" />

      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Log in</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Enter OTP</Text>
        <Text style={styles.subtext}>
          We’ve sent an OTP to <Text style={styles.bold}>{phoneNumber}</Text>. Please enter the code to continue.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChange(text.replace(/[^0-9]/g, ''), index)}
              keyboardType="number-pad"
              maxLength={1}
              returnKeyType="next"
            />
          ))}
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.resendWrapper}>
          <Text style={styles.resendText}>
            Didn’t receive an OTP?{' '}
            <Text
              style={[styles.resendLink, isResendDisabled && { opacity: 0.5 }]}
              onPress={!isResendDisabled ? resendOTP : undefined}
            >
              Resend
            </Text>
          </Text>
        </View>

        {!!resendMessage && <Text style={styles.resendMessage}>{resendMessage}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  header: { fontSize: 20, fontWeight: '800', marginBottom: 10, color: '#222' },
  subtext: { fontSize: 14, color: '#707070', marginBottom: 30 },
  bold: { fontWeight: '600', color: '#000' },

  topBar: {
    height: 54,
    backgroundColor: '#05141A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  backButton: {
    position: 'absolute',
    left: 12,
    zIndex: 2,
  },
inputWrapper: {
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#717171',
    zIndex: 1,
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? 14 : 0,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingTop: Platform.OS === 'android' ? 14 : 0,
  },
  otpContainer: {
    width: 240,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 25,
    left:-36
  },

  otpInput: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderColor: '#C2C2C2',
    borderRadius: 6,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },

  button: {
    backgroundColor: '#009CA0',
    borderRadius: 8,
    paddingVertical: 17,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.9,
    height: 54,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  errorText: { color: 'red', marginBottom: 20, textAlign: 'center' },
  resendWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    left:-36
  },
  resendLink: { color: '#009CA0', fontWeight: '600' },
  resendMessage: { color: 'green', marginTop: 10, textAlign: 'center' },
});

export default OTPScreen;
