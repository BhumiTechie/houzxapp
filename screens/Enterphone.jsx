import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase'; // Firebase import

const { width } = Dimensions.get('window');

const EnterPhone = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleSendOTP = async () => {
    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return alert("Please enter a valid 10-digit Indian number.");
    }

    const phoneNumber = `+91${phone}`;

    try {
      // Firebase authentication for sending OTP
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
      alert('OTP sent successfully!');
      navigation.navigate('OTPScreen', { confirmation, phoneNumber }); // OTP Screen navigation
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#05141A" barStyle="light-content" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconWrapper}>
          <Image source={require('../assets/aarow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.centerTitleWrapper}>
          <Text style={styles.topBarTitle}>Log in</Text>
        </View>
      </View>

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
  topBar: { backgroundColor: '#05141A', flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, paddingHorizontal: width * 0.05, height: 50 },
  backIconWrapper: { zIndex: 2 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain', position: 'absolute', bottom: 10, left: 0, right: 0 },
  centerTitleWrapper: { position: 'absolute', left: 0, right: 0, top: 10, alignItems: 'center' },
  topBarTitle: { color: '#fff', fontSize: width * 0.05, fontWeight: '600' },
  innerContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  title: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#707070', marginBottom: 30 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 8, backgroundColor: '#fff', height: 56, paddingHorizontal: 12, marginBottom: 25 },
  countryCodeBox: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderRightWidth: 1, borderColor: '#D0D0D0', height: '100%' },
  countryCodeText: { fontSize: 16, color: '#000' },
  phoneInput: { flex: 1, fontSize: 16, color: '#000', paddingHorizontal: 10 },
  button: { backgroundColor: '#009CA0', borderRadius: 8, height: 54, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default EnterPhone;
