import React from 'react';
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

const { width } = Dimensions.get('window');
const baseWidth = 414;
const scale = width / baseWidth;

const responsiveSize = (size) => Math.round(size * scale);

export default function AccountScreen() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const headerPaddingTop = Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + responsiveSize(20) }}
      >
        {/* Header */}
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
            <TouchableOpacity style={styles.avatarWrapper}>
              <Image
                source={{
                  uri:
                    user?.profilePic ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteItzPyeDKBxyWiOA8xrPZXIlxOYv1b1VVg&s',
                }}
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


          {/* Personal Details */}
          <TouchableOpacity style={styles.profileRow}>
            <View style={styles.rowLeft}>
              <Image
                source={require('../assets/personal.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.profileText}>Personal Details</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          {/* My Ads */}
          <TouchableOpacity style={styles.profileRow}>
            <View style={styles.rowLeft}>
              <Image
                source={require('../assets/myads.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.profileText}>My Ads</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.Accountsection}>
          <Text style={styles.accountSectionTitle}>ACCOUNT SETTINGS</Text>


          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
        <Image
                source={require('../assets/emailchange.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Change Email</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
        <Image
                source={require('../assets/changepass.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Change Password</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
            <Image
                source={require('../assets/delete.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
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
            <Image
                source={require('../assets/terms.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Terms & Conditions</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
             <Image
                source={require('../assets/privacy.png')}
                style={styles.iconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Privacy Policy</Text>
            </View>
            <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Share and Sign Out */}
     <View style={styles.bottomSection}>
  <TouchableOpacity style={styles.bottomActionRow}>
    <View style={styles.rowLeft}>
      <Feather name="share-2" size={responsiveSize(20)} />
      <Text style={styles.bottomActionLabel}>Share App</Text>
    </View>
    <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
  </TouchableOpacity>

  <TouchableOpacity style={[styles.bottomActionRow, { borderBottomWidth: 0 }]}>
    <View style={styles.rowLeft}>
      <Feather name="log-out" size={responsiveSize(20)} />
      <Text style={styles.bottomActionLabel}>Sign Out</Text>
    </View>
    <Feather name="chevron-right" size={responsiveSize(20)} color="#999" />
  </TouchableOpacity>
</View>

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
    height: 54,
    backgroundColor: '#05141A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
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
    justifyContent: 'center',
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
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: '#222222',
  },
  email: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.5,
    color: '#777777',
    marginTop: 4,
  },
  avatarWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
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
  //  width: responsiveSize(361),
  height: responsiveSize(161), // React Native doesn’t need high float precision
  backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(30),
    borderRadius: responsiveSize(16),
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  },
 sectionHeader: {
  width: responsiveSize(361),
  height: responsiveSize(49),
  padding: responsiveSize(12),
  justifyContent: 'center',
},

sectionTitle: {
  fontFamily: 'System',
  fontWeight: '500',
  fontSize: responsiveSize(14),
  lineHeight: responsiveSize(14),
  letterSpacing: -0.5,
  color: '#717171',
  width: responsiveSize(58),
  height: responsiveSize(17),
  textAlignVertical: 'center',
},

 profileRow: {
  // width: responsiveSize(361),
  height: responsiveSize(56),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: responsiveSize(12), // Assuming Spacing/3 ≈ 12
  backgroundColor: '#fff',
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
  width: responsiveSize(121),
  height: responsiveSize(19),
  fontFamily: 'SF Pro Text',
  fontWeight: 600,
  fontSize: responsiveSize(16),
  lineHeight: responsiveSize(16),
  letterSpacing: -0.5 * scale,
  color: '#717171',
},
  Accountsection: {
  // width: responsiveSize(361),
  height: responsiveSize(217),
  backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(30),
    borderRadius: responsiveSize(16),
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  borderRadius: responsiveSize(12), // assuming Spacing/2 = 12
  paddingVertical: responsiveSize(8),
  marginHorizontal: responsiveSize(16),
  marginTop: responsiveSize(20),
},
accountSectionTitle: {
  fontFamily: 'SF Pro Text',
  fontWeight: '500',
  fontSize: responsiveSize(14),
  lineHeight: responsiveSize(14), // 100%
  letterSpacing: -0.5 * scale,
  color: '#717171',
  height: responsiveSize(17),
  width: responsiveSize(144),
  textAlignVertical: 'center', // for vertical-align: middle equivalent
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
  legalsection:{
   height: responsiveSize(161),
  backgroundColor: '#FFFFFF',
    padding: responsiveSize(12),
    marginHorizontal: responsiveSize(16),
    marginTop: responsiveSize(30),
    borderRadius: responsiveSize(16),
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  borderRadius: responsiveSize(12), // assuming Spacing/2 = 12
  paddingVertical: responsiveSize(8),
  marginHorizontal: responsiveSize(16),
  marginTop: responsiveSize(20),
},
legalTitle: {
  fontFamily: 'SF Pro Text',
  fontWeight: '500',
  fontSize: responsiveSize(14),
  lineHeight: responsiveSize(14), // 100% line height
  letterSpacing: -0.5 * scale,
  color: '#717171',
  height: responsiveSize(17),
  width: responsiveSize(45),
  textAlignVertical: 'center', // vertical-align के लिए
},
bottomSection: {
  width: responsiveSize(361),
  borderRadius: responsiveSize(12), // Spacing/2
  borderWidth: 1,
  borderColor: '#E0E0E0',
  backgroundColor: '#fff',
  overflow: 'hidden',
},

bottomActionRow: {
  width: '100%',
  height: responsiveSize(56),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: responsiveSize(12), // Spacing/3
  borderBottomWidth: 1,
  borderBottomColor: '#E0E0E0',
},

rowLeft: {
  flexDirection: 'row',
  alignItems: 'center',
},

bottomActionLabel: {
  fontFamily: 'SF Pro Text',
  fontWeight: '400',
  fontSize: responsiveSize(16),
  lineHeight: responsiveSize(16),
  letterSpacing: -0.5 * scale,
  color: '#333',
  marginLeft: responsiveSize(12),
},

});

