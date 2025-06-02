import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, StatusBar, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Or any other icon library

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}$/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert('Error', 'Your password must be minimum 10 characters long and contain at least 1 number, 1 symbol, uppercase and lowercase letter.');
      return;
    }

    try {
   const response = await fetch('http://192.168.39.141:5000/auth/reset-password', {

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

  {/* Optional right placeholder to balance layout if needed */}
  <View style={{ width: 34 }} /> 
</View>

        <ScrollView contentContainerStyle={styles.scroll}>
        {/* Added paddingTop here to shift the inputs down */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              onChangeText={setNewPassword}
              value={newPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleNewPasswordVisibility}>
              <Icon name={showNewPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleConfirmPasswordVisibility}>
              <Icon name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.passwordRequirements}>
            Your password must be at least 10 characters long, containing at least 1 number, 1 symbol, and both uppercase and lowercase letters.
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
  
  backIconWrapper: {
    paddingRight: 20,
    zIndex: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
    top:-20,
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
    paddingTop: 30, // Adjusted padding to move inputs down
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
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
