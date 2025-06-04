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
const [request, response, promptAsync] = AuthSession.useAuthRequest(
  {
    clientId: '551111204652-ivkvskaaqr6vrq547nnia3sn9lsvddch.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
    responseType: 'id_token',  // ✅ important
    extraParams: {
      nonce: Math.random().toString(36).substring(2),
    },
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,  // ✅ keep this ON for Expo Go
    }),
  },
  discovery
);



  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('✅ ID Token:', id_token);

      // Aap chahe to id_token ko decode karke user info nikal sakte hain
      // ya sidha yahan se app ki next screen par ja sakte hain

      Alert.alert('Login Successful', 'You have logged in with Google!');
      navigation.navigate('Home');
    } else if (response?.type === 'error') {
      Alert.alert('Login Failed', 'Google Sign-In failed. Please try again.');
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    if (request) {
      promptAsync();
    } else {
      Alert.alert('Error', 'Google Sign-In is not ready yet. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/group.png')} style={styles.bgImage} />
      <View style={styles.content}>
        <Image source={require('../assets/logohouzx.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.subtitle}>BUY, RENT AND SELL PROPERTIES</Text>
        <View style={styles.divider} />

        {/* Apple Sign-In Button - For now no action */}
        <TouchableOpacity style={styles.btn}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/apple.png')} style={styles.icon} />
            <Text style={styles.btnText}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.btn} onPress={handleGoogleSignIn} disabled={!request}>
          <View style={styles.btnInner}>
            <Image source={require('../assets/google.png')} style={styles.googleIcon} />
            <Text style={styles.btnText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        {/* Email Sign-Up */}
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
    justifyContent: 'center',
    paddingHorizontal: width * 0.058,
  },
  bgImage: {
    width: 393,
    height: 190,
    position: 'absolute',
    top: 99,
    borderRadius: 1,
    opacity: 0.80,
  },
  logo: {
    width: 211,
    height: 59,
    position: 'absolute',
    top: -height * 0.17,
  },
  content: {
    width: '85%',
    alignItems: 'center',
    marginTop: height * 0.2,
  },
  subtitle: {
    position: 'absolute',
    top: -height * 0.06,
    fontSize: 13,
    color: '#FFFFFFE5',
    textTransform: 'uppercase',
  },
  divider: {
    width: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#EBEBEB80',
    position: 'absolute',
    top: -12,
    left: width * 0.30,
  },
  btn: {
    backgroundColor: '#FFFFFF33',
    width: width * 0.9,
    height: height * 0.07,
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
    fontWeight: '500',
    fontSize: width * 0.04,
    lineHeight: 16,
    letterSpacing: -0.08,
    color: '#FFFFFF',
    left: 50,
  },
  bottomText: {
    color: '#ccc',
    marginTop: height * 0.03,
    fontWeight: '400',
    fontSize: width * 0.04,
    lineHeight: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  login: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
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
   