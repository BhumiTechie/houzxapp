import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ✅ Screens
import Welcome from './screens/Welcome';
import SignupScreen from './screens/SignupScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import LoginScreen from './screens/LoginScreen';
import Enterphone from './screens/Enterphone';
import OTPScreen from './screens/OTPScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import SplashScreen from './screens/SplashScreen'; 
import HomeScreen from './screens/HomeScreen';
import SearchScreen  from './screens/SearchScreen';



// Create the navigator instance
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        <Stack.Screen name="Enterphone" component={Enterphone} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen 
          name="SearchScreen" 
          component={SearchScreen}
          options={{ title: 'Search Filter' }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ title: 'Reset Password' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animation: 'slide_from_right',
            animationDuration: 300
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
