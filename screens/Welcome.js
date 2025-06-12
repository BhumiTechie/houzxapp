// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';

// WebBrowser.maybeCompleteAuthSession();

// const { width, height } = Dimensions.get('window'); // Get screen dimensions

// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//   tokenEndpoint: 'https://oauth2.googleapis.com/token',
//   revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
// };

// const Welcome = ({ navigation }) => {

//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: '551111204652-cbus5p4smb3scaa4kj97fqmlivkkku4m.apps.googleusercontent.com',
//       scopes: ['openid', 'profile', 'email'],
//       responseType: 'id_token',
//       redirectUri: AuthSession.makeRedirectUri({
//         native: 'your.app://redirect',
//       }),
//     },
//     discovery
//   );

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       console.log('ID Token:', id_token);
//     }
//   }, [response]);

//   const handleGoogleSignIn = () => {
//     promptAsync();
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/group.png')} style={styles.bgImage} />
//       <View style={styles.content}>
//         <Image source={require('../assets/logohouzx.png')} style={styles.logo} resizeMode="contain" />
//         <Text style={styles.subtitle}>BUY, RENT AND SELL PROPERTIES</Text>
//         <View style={styles.divider} />

//         {/* Apple Sign-In Button */}
//         <TouchableOpacity style={styles.btn}>
//           <View style={styles.btnInner}>
//             <Image source={require('../assets/apple.png')} style={styles.icon} />
//             <Text style={styles.btnText}>Continue with Apple</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Sign Up with Email Button */}
       

//         {/* Google Sign-In Button */}
//         <TouchableOpacity style={styles.btn} onPress={handleGoogleSignIn}>
//           <View style={styles.btnInner}>
//             <Image source={require('../assets/google.png')} style={styles.googleIcon} />
//             <Text style={styles.btnText}>Continue with Google</Text>
//           </View>
//         </TouchableOpacity>
//          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Signup')}>
//           <View style={styles.btnInner}>
//             <Image source={require('../assets/mail.png')} style={styles.mailIcon} />
//             <Text style={styles.btnText}>Sign up with Email</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Log In Text */}
//         <Text style={styles.bottomText}>
//           Already have an account?{' '}
//           <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
//             Log in.
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default Welcome;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#05141A',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: width * 0.058,  // Adding some horizontal padding for smaller screens
//   },
// bgImage: {
//   width: 393,
//   height: 190,
//   position: 'absolute',
//   top: 99,
//   borderRadius: 1,
//   opacity: 0.80  // 👈 Kam opacity
// },

//   logo: {
//     width: 211,  // Adjusted width to be flexible
//     height: 59,  // Adjusted height to be proportional
//     position: 'absolute',
//     top: -height * 0.17 // Adjusted to move the logo down slightly so it doesn't overlap with background
//   },
//   content: {
//     width: '85%',
//     alignItems: 'center',
//     marginTop: height * 0.2,  // Moved the content further down to make space for the background and logo
//   },
//   subtitle: {
//     position: 'absolute',
//     top: -height * 0.06,  // Adjusted for smaller devices
//     fontSize: 13  ,  // Dynamic font size
//     color: '#FFFFFFE5',
//     textTransform: 'uppercase',

//   },
//   divider: {
//     width: 60,
//     borderBottomWidth: 2,
//     borderBottomColor: '#EBEBEB80',
//     position: 'absolute',
//     top: -12,
//     left: width * 0.30,  
//   },
//   btn: {
//     backgroundColor: '#FFFFFF33',
//     width: width * 0.9,  
//     height: height * 0.07,  
//     borderRadius: 8,
//     justifyContent: 'center',
//     marginVertical: 8,
//   },
//   btnInner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 16,
//   },
//   icon: {
//     width: 19.63,
//     height: 24,
//     marginRight: 20,
//   },
//   btnText: {
//     fontFamily: 'SF-Pro-Text-Medium',
//     fontWeight: '500',
//     fontSize: width * 0.04,  // Dynamic font size based on screen width
//     lineHeight: 16,
//     letterSpacing: -0.08,
//     color: '#FFFFFF',
//     left: 50,
//   },
//   bottomText: {
//     color: '#ccc',
//     marginTop: height * 0.03,  // Adjusted for spacing on smaller screens
//     fontFamily: 'SF Pro Text',
//     fontWeight: '400',
//     fontSize: width * 0.04,  // Dynamic font size
//     lineHeight: 16,
//     letterSpacing: -0.5,
//     textAlign: 'center',
//   },
//   login: {
//     fontFamily: 'SF Pro Text',
//     fontWeight: 'bold',
//     fontSize: width * 0.04,  // Dynamic font size
//     letterSpacing: -0.5,
//     color: '#3DEFD3',
//   },
//   mailIcon: {
//     width: 24,
//     height: 17.91,
//     marginRight: 20,
//     marginTop: 3,
//   },
//   googleIcon: {
//     width: 24,
//     height: 24,
//     marginRight: 20,
//     marginTop: 2,
//   },
// });
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const Welcome = ({ navigation }) => {
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  console.log('👉 Redirect URI:', redirectUri);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'YOUR_CLIENT_ID_HERE',
      scopes: ['openid', 'profile', 'email'],
      responseType: 'id_token',
      redirectUri,
      extraParams: {
        nonce: Math.random().toString(36).substring(2),
      },
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('✅ Google ID Token:', id_token);
      Alert.alert('Login Successful', 'You have logged in with Google!');
      navigation.navigate('Home');
    } else if (response?.type === 'error') {
      Alert.alert('Login Failed', 'Google Sign-In failed.');
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    if (request) {
      promptAsync();
    } else {
      Alert.alert('Error', 'Google Sign-In not ready.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/group.png')} style={styles.bgImage} />

      <View style={styles.wrapper}>
        <Image source={require('../assets/logohouzx.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>BUY, RENT AND SELL PROPERTIES</Text>
        <View style={styles.divider} />

        {/* Apple */}
        <TouchableOpacity style={styles.btn}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/apple.png')} style={styles.icon} />
            <Text style={styles.btnText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity style={styles.btn} onPress={handleGoogleSignIn} disabled={!request}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/google.png')} style={styles.googleIcon} />
            <Text style={styles.btnText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Signup')}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/mail.png')} style={styles.mailIcon} />
            <Text style={styles.btnText}>Sign up with Email</Text>
          </View>
        </TouchableOpacity>

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
    justifyContent: 'flex-start',
  },
  bgImage: {
    width: 393,
    height: 190,
    position: 'absolute',
    top: 99,
    borderRadius: 1,
    opacity: 0.8,
  },

 wrapper: {
  position: 'absolute',
  top: 223,
  width: width - 32, // dynamic width, screen-safe
  height: 405,
  paddingHorizontal: 0,
  alignSelf: 'center',
  alignItems: 'center',
},

  logo: {
    width: 211,
    height: 59,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'System', // Replace with 'SF Pro Text' when loaded via expo-font
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFFE5',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 0.36, // 3%
    marginTop: 10,
    marginBottom: 6,
  },
  divider: {
    width: 60,
    height: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB80',
    marginBottom: 18,
    // width: 363,
height: 19,

  },
 btn: {
  width: '100%', // fill wrapper safely
  height: 58,
  backgroundColor: '#FFFFFF33',
  borderRadius: 8,
  marginVertical: 6,
},

  btnInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 17,
    left: 16,
    width: 20,
    height: 24,
  },
  googleIcon: {
    position: 'absolute',
    top: 17,
    left: 16,
    width: 24,
    height: 24,
  },
  mailIcon: {
    position: 'absolute',
    top: 20,
    left: 16,
    width: 24,
    height: 18,
  },
  btnText: {
    position: 'absolute',
    top: 20,
    left: 105,
    width: 155,
    height: 19,
    fontFamily: 'System', // Replace with 'SF Pro Text'
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.5,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottomText: {
    marginTop: 20,
    color: '#ccc',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  login: {
    fontWeight: '600',
    fontSize: 14,
    color: '#3DEFD3',
  },
});  