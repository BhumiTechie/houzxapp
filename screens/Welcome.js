import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const Welcome = ({ navigation }) => {

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '551111204652-cbus5p4smb3scaa4kj97fqmlivkkku4m.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
      responseType: 'id_token',
      redirectUri: AuthSession.makeRedirectUri({
        native: 'your.app://redirect',
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('ID Token:', id_token);
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/group.png')} style={styles.bgImage} />
      <View style={styles.content}>
        <Image source={require('../assets/logohouzx.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>BUY, RENT AND SELL PROPERTIES</Text>
        <View style={styles.divider} />

        {/* Apple Sign-In Button */}
        <TouchableOpacity style={styles.btn}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/apple.png')} style={styles.icon} />
            <Text style={styles.btnText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        {/* Sign Up with Email Button */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Signup')}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/mail.png')} style={styles.mailIcon} />
            <Text style={styles.btnText}>Sign up with Email</Text>
          </View>
        </TouchableOpacity>

        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.btn} onPress={handleGoogleSignIn}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/google.png')} style={styles.googleIcon} />
            <Text style={styles.btnText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        {/* Log In Text */}
        <Text style={styles.bottomText}>
          Already have an account?{' '}
          <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
            Log in.
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05141A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,  // Adding some horizontal padding for smaller screens
  },
  bgImage: {
    width: width * 0.95,  // Adjusted to make it more flexible
    height: height * 0.3,  // Adjusted height to ensure more of the background is visible
    position: 'absolute',
    top: height * 0.03, // Moved it slightly up to show more of the background
    borderRadius: 1,
    backgroundColor: '#FFFFFF05',
    // opacity: 0.3,  // Reduced opacity to make it more subtle
  },
  logo: {
    width: width * 0.5,  // Adjusted width to be flexible
    height: height * 0.1,  // Adjusted height to be proportional
    position: 'absolute',
    top: -height * 0.2  // Adjusted to move the logo down slightly so it doesn't overlap with background
  },
  content: {
    width: '85%',
    alignItems: 'center',
    marginTop: height * 0.2,  // Moved the content further down to make space for the background and logo
  },
  subtitle: {
    position: 'absolute',
    top: -height * 0.09,  // Adjusted for smaller devices
    fontSize: width * 0.03,  // Dynamic font size
    color: 'white',
    textTransform: 'uppercase',
  },
  divider: {
    width: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB80',
    position: 'absolute',
    top: -15,
    left: width * 0.30,  // Adjusted for better centering on smaller devices
  },
  btn: {
    backgroundColor: '#FFFFFF33',
    width: width * 0.9,  // Adjusted width for responsiveness
    height: height * 0.07,  // Adjusted height for consistency
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 8,
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  icon: {
    width: 19.63,
    height: 24,
    marginRight: 20,
  },
  btnText: {
    fontFamily: 'SF-Pro-Text-Medium',
    fontWeight: '500',
    fontSize: width * 0.04,  // Dynamic font size based on screen width
    lineHeight: 16,
    letterSpacing: -0.08,
    color: '#FFFFFF',
    left: 50,
  },
  bottomText: {
    color: '#ccc',
    marginTop: height * 0.03,  // Adjusted for spacing on smaller screens
    fontFamily: 'SF Pro Text',
    fontWeight: '400',
    fontSize: width * 0.04,  // Dynamic font size
    lineHeight: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  login: {
    fontFamily: 'SF Pro Text',
    fontWeight: 'bold',
    fontSize: width * 0.04,  // Dynamic font size
    letterSpacing: -0.5,
    color: '#3DEFD3',
  },
  mailIcon: {
    width: 24,
    height: 17.91,
    marginRight: 20,
    marginTop: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
    marginTop: 2,
  },
});
