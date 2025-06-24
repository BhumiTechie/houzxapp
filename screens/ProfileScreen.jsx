import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const { setUser } = useUser();

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('userData');
        if (saved) {
          const parsed = JSON.parse(saved);
          setFirstName(parsed.firstName || '');
          setLastName(parsed.lastName || '');
          setProfileImage(parsed.profileImage || null);
          console.log('ProfileScreen: Pre-filled with existing name data:', parsed);
        }
      } catch (e) {
        console.log('Error loading profile data for pre-fill:', e);
      }
    };
    loadData();
  }, []);

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Please allow access to photos to upload a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    const fullName = `${firstName} ${lastName}`.trim();

    if (!firstName || !lastName) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    let existingUserData = {};
    try {
      const saved = await AsyncStorage.getItem('userData');
      if (saved) {
        existingUserData = JSON.parse(saved);
        console.log('ProfileScreen: Existing user data loaded BEFORE MERGE:', existingUserData);
      } else {
        console.log('ProfileScreen: No existing user data found, starting name fresh.');
      }
    } catch (e) {
      console.error('Error loading existing user data in ProfileScreen for merge:', e);
    }

    const updatedUserData = {
      ...existingUserData,
      firstName,
      lastName,
      name: fullName,
      profileImage,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      console.log('ProfileScreen: User data SAVED AFTER MERGE:', updatedUserData);
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      console.error('Error saving userData in ProfileScreen:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Create Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.imagePlaceholder} onPress={handleImagePick}>
        {profileImage ? (
          <>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Change</Text>
            </View>
            <Ionicons name="camera" size={20} color="#fff" style={styles.cameraIcon} />
          </>
        ) : (
          <Text style={styles.imagePlaceholderText}>Upload Photo</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
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
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
    overflow: 'hidden',
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: '#666',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 4,
    borderRadius: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#009CA0',
    borderRadius: 8,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
