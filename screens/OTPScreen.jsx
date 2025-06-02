import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
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
      const response = await axios.post('http://192.168.39.141:5000/auth/verify-otp', {
        phoneNumber,
        otp: enteredOtp,
      });

      if (response.data.success) {
        alert('OTP Verified!');
        navigation.navigate('ResetPasswordScreen', { phoneNumber });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Error verifying OTP');
      }
    }
  };

  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text) {
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendOTP = async () => {
    setIsResendDisabled(true);
    try {
      const response = await axios.post('http://192.168.39.141:5000/auth/resend-otp', {
        phoneNumber,
      });

      if (response.data.success) {
        setResendMessage('OTP has been resent successfully.');
        setOtp(['', '', '', '']);
        inputRefs.current[0].focus();
      } else {
        setResendMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setResendMessage('Error resending OTP');
    } finally {
      setTimeout(() => setIsResendDisabled(false), 30000); // Cooldown 30 sec
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#05141A" barStyle="light-content" />
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Welcome');
            }
          }}
        >
          <Image source={require('../assets/aarow.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Log in</Text>
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
              autoFocus={index === 0}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.resendWrapper}>
          <Text style={styles.resendText}>
            Didn’t receive an OTP?{' '}
            <Text
              style={[styles.resendLink, isResendDisabled && { opacity: 0.5 }]}
              onPress={!isResendDisabled ? resendOTP : null}
            >
              Resend
            </Text>
          </Text>
        </View>

        {resendMessage ? <Text style={styles.resendMessage}>{resendMessage}</Text> : null}

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
  header: { fontSize: 20, fontWeight: '600', marginBottom: 10, textAlign: 'left' },
  subtext: { fontSize: 14, color: '#707070', marginBottom: 30 },
  bold: { fontWeight: '600', color: '#000' },
  topBar: {
    backgroundColor: '#05141A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
    paddingBottom: 15,
    paddingHorizontal: 16,
    position: 'relative',
  },
  backIconWrapper: { paddingRight: 20, zIndex: 2 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  otpInput: {
    width: width * 0.18,
    height: width * 0.18,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#C0C0C0',
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  errorText: { color: 'red', marginBottom: 20 },
  resendWrapper: { width: 361, height: 19, alignSelf: 'center', marginBottom: 20 },
  resendText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.5,
    color: '#000',
    textAlign: 'center',
  },
  resendLink: { color: '#009CA0', fontWeight: '600', fontFamily: 'SF Pro Text' },
  resendMessage: { color: 'green', marginTop: 10, textAlign: 'center' },
});

export default OTPScreen;
