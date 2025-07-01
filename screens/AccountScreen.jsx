import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');
const baseWidth = 414;
const scale = width / baseWidth;
const responsiveSize = (size) => Math.round(size * scale);

export default function AccountScreen() {
  const { user, updateUser, logout } = useUser();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const headerPaddingTop = Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50;

  useEffect(() => {
    console.log('AccountScreen: Current user data from context:', user);
  }, [user]);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Please allow access to your media library to change profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0].uri;
        if (updateUser) {
          updateUser({ ...user, profileImage: selectedImage });
        }
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + responsiveSize(20) }}
      >
        <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
          <Text style={styles.title}>Account</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.profileTextContainer}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {user?.name || 'Your Name'}
              </Text>
              <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
                {user?.email || 'your@email.com'}
              </Text>
            </View>
            <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
              <Image
                source={{ uri: user?.profileImage || 'https://via.placeholder.com/64' }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={styles.cameraIcon}>
                <Feather name="camera" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PROFILE</Text>
          </View>

          <TouchableOpacity
            style={styles.profileRow}
            onPress={() => navigation.navigate('PersonalDetails')}
          >
            <View style={styles.rowLeft}>
              <Image source={require('../assets/personal.png')} style={styles.iconImage} />
              <Text style={styles.profileText}>Personal Details</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileRow}
            onPress={() => navigation.navigate('MyAds')}
          >
            <View style={styles.rowLeft}>
              <Image source={require('../assets/myads.png')} style={styles.iconImage} />
              <Text style={styles.profileText}>My Ads</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.Accountsection}>
          <Text style={styles.accountSectionTitle}>ACCOUNT SETTINGS</Text>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangeEmail')}>
            <View style={styles.rowLeft}>
              <Image source={require('../assets/emailchange.png')} style={styles.iconImage} />
              <Text style={styles.label}>Change Email</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangePassword')}>
            <View style={styles.rowLeft}>
              <Image source={require('../assets/changepass.png')} style={styles.iconImage} />
              <Text style={styles.label}>Change Password</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ConfirmDelete')}>
            <View style={styles.rowLeft}>
              <Image source={require('../assets/delete.png')} style={styles.iconImage} />
              <Text style={styles.label}>Delete Account</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Legal */}
        <View style={styles.legalsection}>
          <Text style={styles.legalTitle}>LEGAL</Text>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <Image source={require('../assets/terms.png')} style={styles.iconImage} />
              <Text style={styles.label}>Terms & Conditions</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <Image source={require('../assets/privacy.png')} style={styles.iconImage} />
              <Text style={styles.label}>Privacy Policy</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Share App')}>
            <View style={styles.rowLeft}>
              <Feather name="share-2" size={responsiveSize(20)} color="#000" />
              <Text style={styles.label}>Share App</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleSignOut}>
            <View style={styles.rowLeft}>
              <Feather name="log-out" size={responsiveSize(20)} color="#000" />
              <Text style={styles.label}>Sign Out</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Modal */}
        <Modal
          isVisible={showSignOutModal}
          onBackdropPress={() => setShowSignOutModal(false)}
          backdropOpacity={0.4}
          animationIn="zoomIn"
          animationOut="zoomOut"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sign Out?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to sign out of your account?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowSignOutModal(false)}
              >
                <Text style={styles.modalCancelText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirm}
                onPress={() => {
                  setShowSignOutModal(false);
                  logout();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                  });
                }} 
              >
                <Text style={styles.modalConfirmText}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#05141A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(30),
    borderRadius: responsiveSize(16),
    borderWidth: 1,
    borderColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileTextContainer: {
    width: 207,
    height: 50,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 24,
    color: '#222222',
  },
  email: {
    fontWeight: '400',
    fontSize: 14,
    color: '#777777',
    marginTop: 4,
  },
  avatarWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    borderColor: '#eee',
    borderWidth: 1,
  },
  cameraIcon: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 24,
    height: 24,
    backgroundColor: '#05141A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(30),
    borderRadius: responsiveSize(16),
    borderWidth: 1,
    borderColor: '#fff',
  },
  sectionHeader: {
    padding: responsiveSize(12),
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: responsiveSize(14),
    color: '#717171',
  },
  profileRow: {
    height: responsiveSize(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveSize(10),
  },
  iconImage: {
    width: responsiveSize(24),
    height: responsiveSize(24),
  },
  profileText: {
    fontWeight: '600',
    fontSize: responsiveSize(16),
    color: '#717171',
  },
  Accountsection: {
    backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(20),
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    borderColor: '#fff',
  },
  accountSectionTitle: {
    fontWeight: '500',
    fontSize: responsiveSize(14),
    color: '#717171',
    marginBottom: responsiveSize(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveSize(14),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: responsiveSize(10),
  },
  label: {
    fontSize: responsiveSize(16),
    color: '#333',
    marginLeft: responsiveSize(15),
  },
  legalsection: {
    backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(20),
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    borderColor: '#fff',
  },
  legalTitle: {
    fontWeight: '500',
    fontSize: responsiveSize(14),
    color: '#717171',
    marginBottom: responsiveSize(8),
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(20),
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    borderColor: '#fff',
  },

  // MODAL STYLES
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancel: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#009CA0',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#009CA0',
    fontWeight: '600',
    fontSize: 16,
  },
  modalConfirm: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#009CA0',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
