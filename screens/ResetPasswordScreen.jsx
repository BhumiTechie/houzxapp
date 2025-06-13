import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const updatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Error',
        'Your password must be minimum 10 characters long and contain at least 1 number, 1 symbol, uppercase and lowercase letter.'
      );
      return;
    }

    try {
      const response = await fetch('http://192.168.36.141:5000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: route.params?.phoneNumber,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password updated successfully!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Failed to reset password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
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

        <Text style={styles.topBarTitle}>Recover Password</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inputSection}>
          {/* New Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>New Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                placeholderTextColor="#B0B0B0"
                autoCapitalize="none"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
              />
              <TouchableOpacity onPress={toggleNewPasswordVisibility}>
                <Icon
                  name={showNewPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Confirm Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                placeholderTextColor="#B0B0B0"
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                <Icon
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#888"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.passwordRequirements}>
            Your password must be minimum 10 characters long. Contain at least 1 number, 1 symbol,
            Uppercase and lower case.
          </Text>

          <TouchableOpacity style={styles.button} onPress={updatePassword}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#05141A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 60,
    paddingBottom: 2,
    paddingHorizontal: 18,
  },
  backIcon: {
    width: 24,
    height: 24,
    top: -20,
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
  scroll: {
    padding: 20,
    flexGrow: 1,
  },
  inputSection: {
    paddingTop: 30,
  },
  inputWrapper: {
    marginBottom: 20,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    marginLeft: 8,
  },
  passwordRequirements: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#009CA0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResetPasswordScreen;
