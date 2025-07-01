import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ChangePasswordScreen = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);
  const [secure3, setSecure3] = useState(true);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
    return regex.test(password);
  };

  const handleChangePassword = () => {
    if (!password1 || !password2 || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (password2 !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!validatePassword(password2)) {
      alert('Password must be minimum 10 characters long and contain at least 1 number, 1 symbol, uppercase and lowercase letter.');
      return;
    }

    // Handle actual password change logic here (API call etc.)
    alert('Password changed successfully!');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={password1}
            onChangeText={setPassword1}
            secureTextEntry={secure1}
            placeholder="Enter password"
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setSecure1(!secure1)}>
            <Icon name={secure1 ? 'eye-off' : 'eye'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry={secure2}
            placeholder="Enter password"
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setSecure2(!secure2)}>
            <Icon name={secure2 ? 'eye-off' : 'eye'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secure3}
            placeholder="Enter password"
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setSecure3(!secure3)}>
            <Icon name={secure3 ? 'eye-off' : 'eye'} size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <Text style={styles.passwordRules}>
          Your password must be minimum 10 characters long. {'\n'}
          Contain at least 1 number, 1 symbol, Uppercase and lower case.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: '#000',
  },
  passwordRules: {
    fontSize: 12,
    color: '#888',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00979D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
