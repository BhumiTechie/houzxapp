// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';

// const OTPScreen = ({ route, navigation }) => {
//   const { phoneNumber } = route.params;
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [error, setError] = useState('');
//   const [timer, setTimer] = useState(30);
//   const inputs = useRef([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const handleChange = (text, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);
//     if (text && index < 3) inputs.current[index + 1].focus();
//   };

//   const handleVerifyOTP = () => {
//     const finalOTP = otp.join('');
//     if (finalOTP.length < 4) {
//       setError('Please enter the 4-digit OTP');
//       return;
//     }

//     // Mock OTP validation
//     if (finalOTP === '1234') {
//       setError('');
//       Alert.alert('Success', 'OTP Verified!');
//       navigation.navigate('ResetPasswordScreen', { phoneNumber });
//     } else {
//       setError('Incorrect OTP');
//     }
//   };

//   const handleResend = () => {
//     if (timer === 0) {
//       setTimer(30);
//       setOtp(['', '', '', '']);
//       Alert.alert('OTP Resent', `New OTP sent to ${phoneNumber}`);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <Text style={styles.title}>Enter OTP</Text>
//       <Text style={styles.subtext}>We’ve sent an OTP to {phoneNumber}</Text>

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={ref => (inputs.current[index] = ref)}
//             style={styles.otpBox}
//             keyboardType="number-pad"
//             maxLength={1}
//             value={digit}
//             onChangeText={text => handleChange(text, index)}
//           />
//         ))}
//       </View>

//       {error ? <Text style={styles.errorText}>{error}</Text> : null}

//       <TouchableOpacity style={styles.continueButton} onPress={handleVerifyOTP}>
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>

//       <TouchableOpacity disabled={timer !== 0} onPress={handleResend}>
//         <Text style={styles.resendText}>
//           Didn’t receive OTP? {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
//         </Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// export default OTPScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#000',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
//   subtext: {
//     fontSize: 14,
//     color: '#717171',
//     textAlign: 'center',
//     marginBottom: 28,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     paddingHorizontal: 20,
//   },
//   otpBox: {
//     width: 56,
//     height: 56,
//     borderWidth: 1,
//     borderColor: '#009CA0',
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '500',
//     color: '#000',
//   },
//   errorText: {
//     textAlign: 'center',
//     color: '#FF3B30',
//     marginBottom: 12,
//     fontSize: 13,
//   },
//   continueButton: {
//     backgroundColor: '#009CA0',
//     borderRadius: 8,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginBottom: 16,
//   },
//   continueText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   resendText: {
//     textAlign: 'center',
//     color: '#009CA0',
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });
// OTPScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { auth } from '../firebase';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const OTPScreen = ({ route, navigation }) => {
  const { phoneNumber, verificationId } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) inputs.current[index + 1].focus();
  };

  const handleVerifyOTP = async () => {
    const finalOTP = otp.join('');
    if (finalOTP.length < 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, finalOTP);
      await signInWithCredential(auth, credential);
      Alert.alert('Success', 'OTP Verified!');
      navigation.navigate('ResetPasswordScreen', { phoneNumber });
    } catch (error) {
      setError('Incorrect OTP');
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '']);
      Alert.alert('OTP Resent', `New OTP sent to ${phoneNumber}`);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtext}>We’ve sent an OTP to {phoneNumber}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.continueButton} onPress={handleVerifyOTP}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={timer !== 0} onPress={handleResend}>
        <Text style={styles.resendText}>
          Didn’t receive OTP? {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 10 },
  subtext: { fontSize: 16, color: '#707070', marginBottom: 20 },
  otpContainer: { flexDirection: 'row', marginBottom: 20 },
  otpBox: { width: 50, height: 50, borderWidth: 1, borderRadius: 8, margin: 5, textAlign: 'center', fontSize: 24 },
  errorText: { color: 'red', marginBottom: 20 },
  continueButton: { backgroundColor: '#009CA0', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 30, marginBottom: 20 },
  continueText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  resendText: { color: '#009CA0', fontSize: 14, textAlign: 'center' },
});

export default OTPScreen;
