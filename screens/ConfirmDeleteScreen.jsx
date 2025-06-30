import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
// If you're using Firebase, uncomment these
// import { getAuth, deleteUser } from 'firebase/auth';

export default function ConfirmDeleteScreen() {
  const navigation = useNavigation();

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to permanently delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // 🔁 Replace this block with your own backend deletion logic

              // Example with Firebase Auth:
              // const auth = getAuth();
              // const user = auth.currentUser;
              // await deleteUser(user);

              // Example with REST API:
              // await fetch('https://your-api.com/delete-account', {
              //   method: 'DELETE',
              //   headers: {
              //     Authorization: `Bearer YOUR_AUTH_TOKEN`,
              //   },
              // });

              // ✅ Navigate to login screen after deletion
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }], // Replace 'Login' with your login screen name
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete account. Please try again.');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delete Account</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Are you sure you want to delete your account?</Text>
        <Text style={styles.subText}>
          Deleting your account will delete the account itself and any personal information
          contained in the account.
        </Text>
        <Text style={styles.subText}>
          We may hold other personal information which is not linked to your account.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleGoBack}>
          <Text style={styles.cancelText}>No, go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: '#05141A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    left:'70'
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  subText: {
    fontSize: 14,
    color: '#5E5E5E',
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  deleteButton: {
    backgroundColor: '#009CA6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#009CA6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#009CA6',
    fontSize: 16,
    fontWeight: '600',
  },
});
