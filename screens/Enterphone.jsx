import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const EnterPhone = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleSendOTP = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return alert('Please enter a valid 10-digit Indian number.');
    }

    const phoneNumber = `+91${phone}`;

    try {
      const response = await axios.post('http://192.168.39.141:5000/auth/send-otp', { phoneNumber });


      if (response.data.success) {   
        alert('OTP sent successfully!');
        navigation.navigate('OTPScreen', { phoneNumber });
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.response ? error.response.data : error.message);
      alert('Failed to send OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#05141A" barStyle="light-content" />

      {/* Top Navigation Bar */}
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

      {/* Phone Input Section */}
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter phone number.</Text>
        <Text style={styles.subtitle}>We will send OTP (One Time Password) to this number.</Text>

        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            placeholderTextColor="#B0B0B0"
            keyboardType="phone-pad"
            maxLength={10}
            style={styles.phoneInput}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    backgroundColor: '#05141A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
    paddingBottom: 15,
    paddingHorizontal: 16,
    position: 'relative',
  },
  backIconWrapper: {
    paddingRight: 20,
    zIndex: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
  innerContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  title: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#707070', marginBottom: 30 },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 56,
    paddingHorizontal: 12,
    marginBottom: 25,
  },
  countryCodeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#D0D0D0',
    height: '100%',
  },
  countryCodeText: { fontSize: 16, color: '#000' },
  phoneInput: { flex: 1, fontSize: 16, color: '#000', paddingHorizontal: 10 },
  button: {
    backgroundColor: '#009CA0',
    borderRadius: 8,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default EnterPhone;
