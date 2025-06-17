import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext'; // ✅ import context

const { width } = Dimensions.get('window');
const maxWidth = 361;

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useUser(); // ✅ context hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      const savedPassword = await AsyncStorage.getItem('userPassword');
      const savedPhone = await AsyncStorage.getItem('userPhone');

      if (
        email.trim().toLowerCase() === savedEmail?.toLowerCase() &&
        password === savedPassword
      ) {
        // ✅ Set user in global context
        setUser({
          name: 'User',
          email: savedEmail,
          phone: savedPhone || '',
          profilePic: `https://i.pravatar.cc/150?u=${savedEmail}`,
        });

        Alert.alert('Success', 'Login successful');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.log('Login Error:', error);
      Alert.alert('Error', 'Something went wrong during login');
    }
  };

  return (
    <View style={styles.screen}>
      {/* 🔙 Top Nav Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Log in</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 🔒 Login Form */}
      <View style={styles.container}>
        {/* Email */}
        <View style={styles.inputWrapper}>
          <Text style={styles.floatingLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter email"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{ margin: 20 }} />

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Text style={styles.floatingLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              placeholderTextColor="#B0B0B0"
              secureTextEntry={secureText}
              autoCapitalize="none"
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

        <View style={{ height: 8 }} />

        {/* Remember Me + Forgot Password */}
        <View style={styles.rememberForgotRow}>
          <TouchableOpacity
            style={styles.rememberMeWrapper}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkedBox]}>
              {rememberMe && (
                <Ionicons name="checkmark" size={14} color="#fff" />
              )}
            </View>
            <Text style={[styles.rememberMeText, rememberMe && { color: '#000' }]}>
              Remember Me
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Enterphone')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 8 }} />

        {/* Log In Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={{ height: 8 }} />

        {/* Sign Up Prompt */}
        <View style={styles.signupRow}>
          <Text style={styles.signupPrompt}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  container: {
    width: Math.min(width * 0.9, maxWidth),
    alignSelf: 'center',
    marginTop: 24,
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
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#B0B0B0',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#009CA0',
    borderColor: '#009CA0',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#8F8F8F',
  },
  forgotPasswordText: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
    maxWidth: 361,
    height: 54,
    backgroundColor: '#009CA0',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: 26,
    gap: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 32,
  },
  signupPrompt: {
    fontSize: 14,
    color: '#5E5E5E',
  },
  signupLink: {
    fontSize: 14,
    color: '#009CA0',
    fontWeight: '600',
  },
});

export default LoginScreen;
