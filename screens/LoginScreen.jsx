import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';


const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
      if (storedLoginStatus === 'true') {
        navigation.navigate('TermsAndConditions'); // ❌
      }
    };
    checkLoginStatus();
  }, []);
  
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
  
    const storedEmail = await AsyncStorage.getItem('userEmail');
    const storedPassword = await AsyncStorage.getItem('userPassword');
  
    if (storedEmail && storedPassword) {
      if (email === storedEmail && password === storedPassword) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.reset({
          index: 0,
          routes: [{ name: 'TermsAndConditions' }],
        });
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
      }
    } else {
      Alert.alert('Error', 'No user found. Please sign up first');
    }
  };
  
  

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
          <Text style={styles.topBarTitle}>Log in</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Email */}
        <View style={styles.inputWrapper}>
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

        {/* Password */}
        <View style={styles.inputWrapper}>
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

        {/* Row: Remember & Forgot */}
        <View style={styles.row}>
          <Text style={styles.remember}>☐ Remember Me</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Enterphone')}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        {/* Sign up */}
        <View style={styles.signupWrapper}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}> Sign up.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 20,
    fontWeight: '600',
    // top: 14,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputWrapper: {
    width: width * 0.9 > 361 ? 361 : width * 0.9,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    marginVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#333',
    zIndex: 1,
  },
  floatingInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    height: '100%',
    paddingTop: 14,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingTop: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    width: width * 0.9 > 361 ? 361 : width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  remember: {
    color: '#8F8F8F',
    fontSize: 14,
  },
  forgot: {
    color: '#009CA0',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#009CA0',
    borderRadius: 8,
    width: width * 0.9 > 361 ? 361 : width * 0.9,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#8F8F8F',
  },
  signupLink: {
    color: '#009CA0',
    fontWeight: '500',
    fontSize: 14,
  },
});
