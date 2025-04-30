import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window'); // Getting screen dimensions

export default function SignupScreen({ navigation }) {
  const [secureText, setSecureText] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isPasswordMatch = password === confirmPassword;

  const handleSignup = async () => {
    if (!email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    if (!isPasswordMatch) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (
      password.length < 10 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 10 characters and include uppercase, lowercase, number, and symbol.'
      );
      return;
    }

    // Saving email and password to AsyncStorage
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);

    // ✅ All good
    navigation.navigate('TermsAndConditions');
  };

  const gap = width * 0.05; // Dynamic gap (5% of screen width)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#05141A" barStyle="light-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Welcome');
            }
          }}
          style={styles.backIconWrapper}
        >
          <Image source={require('../assets/aarow.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.centerTitleWrapper}>
          <Text style={styles.topBarTitle}>Sign up</Text>
        </View>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Email */}
        <View style={[styles.inputWrapper, { marginTop: gap }]}>
          <Text style={styles.floatingLabel}>Email</Text>
          <TextInput
            style={styles.floatingInput}
            placeholder="Enter email"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Phone */}
        <View style={[styles.inputWrapper, { marginTop: gap }]}>
          <Text style={styles.floatingLabel}>Phone Number</Text>
          <TextInput
            style={styles.floatingInput}
            placeholder="Enter phone number"
            placeholderTextColor="#B0B0B0"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Password */}
        <View style={[styles.inputWrapper, { marginTop: gap }]}>
          <Text style={styles.floatingLabel}>Enter Password</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              placeholderTextColor="#B0B0B0"
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#717171"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Info */}
        <Text style={styles.passwordInfo}>
          Your password must be minimum 10 characters long.{"\n"}
          Contain at least 1 number, 1 symbol, Uppercase and {"\n"}lower case.
        </Text>

        {/* Confirm Password */}
        <View style={[styles.inputWrapper, { marginTop: gap }]}>
          <Text style={styles.floatingLabel}>Confirm Password</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm password"
              placeholderTextColor="#B0B0B0"
              secureTextEntry={secureConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
              <Ionicons
                name={secureConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#717171"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password mismatch message */}
        {!isPasswordMatch && confirmPassword.length > 0 && (
          <Text style={{ color: 'red', marginLeft: 5, marginTop: 4 }}>
            Passwords do not match
          </Text>
        )}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account?
          <Text style={styles.spacing}> </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Log in.</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    backgroundColor: '#05141A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjusted padding for Android/iOS
    paddingHorizontal: width * 0.05,  // Adjusted for responsiveness
    height: 50,
  },

  backIconWrapper: {
    zIndex: 2
  },

  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },

  centerTitleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    alignItems: 'center',
  },

  topBarTitle: {
    color: '#fff',
    fontSize: width * 0.05, // Adjusts dynamically
    fontWeight: '600',
  },

  scroll: {
    paddingHorizontal: width * 0.05, // Adjusted for responsiveness
    paddingTop: 10,
  },

  inputWrapper: {
    width: width * 0.9,  // 90% of screen width for responsiveness
    height: 54,  // Fixed height of 54px
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    marginTop: 7,
    marginBottom: 10,
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

  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.5,
    lineHeight: 20,
    color: '#000',
    paddingVertical: 15,
    paddingTop: 18,
    textAlignVertical: 'center',
  },

  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  passwordInfo: {
    width: width * 0.9,  // Adjusted for responsiveness
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: -0.5,
    color: '#717171',
    marginTop: 2,
    left: 10,
  },

  button: {
    width: width * 0.9,  // 90% of screen width for responsiveness
    height: 54,  // Fixed height of 54px
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#009CA0',
    marginTop: 20,
  },

  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  footerText: {
    fontFamily: 'SF Pro Text', // SF Pro Text font-family
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#717171',  // Lighter grey color for the "Already have an account?" part
    marginTop: 20,
  },

  alreadyText: {
    color: '#717171',  // Grey color for the "Already have an account?" part
  },

  loginText: {
    fontFamily: 'SF Pro Text', // SF Pro Text font-family
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
    color: '#000',  // Black color for "Log in." part
    top:5
  },

});
