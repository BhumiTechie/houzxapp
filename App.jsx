import React, { useState } from 'react'; // Import useState
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import SignupScreen from './screens/SignupScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import LoginScreen from './screens/LoginScreen';
import Enterphone from './screens/Enterphone';
import OTPScreen from './screens/OTPScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PropertySearchScreen from './screens/PropertySearchScreen';
import PropertyApp from './screens/PropertyApp';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import NearestStationScreen from './screens/NearestStationScreen';
import NearestSchoolScreen from './screens/NearestSchoolScreen';
import NearestCollegeScreen from './screens/NearestCollegeScreen';
import NearestBusStopScreen from './screens/NearestBusStopScreen';
import NearestAirportScreen from './screens/NearestAirportScreen';




// Import the new screens

import BillingPeriodScreen from './screens/BillingPeriodScreen';
import RentConfirmationScreen from './screens/RentConfirmationScreen';
import FilterScreen from './screens/FilterScreen';
import AdvertiserProfileScreen from './screens/AdvertiserProfileScreen';
import RentFilterScreen from './screens/RentFilterScreen';
import AvailabilityFilterScreen from './screens/AvailabilityFilterScreen';
import PropertyTypeFilterScreen from './screens/PropertyTypeFilterScreen';
import NoOfRoomsFilterScreen from './screens/NoOfRoomsFilterScreen';
import FurnishedTypeFilterScreen from './screens/FurnishedTypeFilterScreen';
import AmenitiesFilterScreen from './screens/AmenitiesFilterScreen';
import SuitableForFilterScreen from './screens/SuitableForFilterScreen';
import SortByModal from './screens/SortByModal';




const Stack = createNativeStackNavigator();

export default function App() {
  // State to manage filter selections, billing preferences, and rent details across screens
  const [filters, setFilters] = useState({});
  const [billingDetails, setBillingDetails] = useState({});
  const [rentDetails, setRentDetails] = useState({});
  const [billsIncluded, setBillsIncluded] = useState(false);
  const [noDeposit, setNoDeposit] = useState(false);

  // Function to handle applying filters from FilterScreen
  const handleApplyFilters = (appliedFilters, navigation) => {
    setFilters(appliedFilters);
    console.log('Applied Filters:', appliedFilters);
    // After applying filters, navigate to the BillingPeriod screen
    navigation.navigate('BillingPeriod');
  };

  // Function to handle selecting billing period and options from BillingPeriodScreen
  const handleSelectBilling = (billingInfo, navigation) => {
    setBillingDetails({
      period: billingInfo.period,
      billsIncluded: billingInfo.billsIncluded,
      noDeposit: billingInfo.noDeposit,
    });

    // Simulate rent calculation based on selected period and options
    let calculatedRent = 0;
    if (billingInfo.period === 'Monthly') {
      calculatedRent = 12000; // Example monthly rent
    } else {
      calculatedRent = 144000; // Example yearly rent
    }

    // Adjust rent if bills are included or no deposit
    if (billingInfo.billsIncluded) {
      calculatedRent += 500; // Example additional cost for bills
    }
    if (billingInfo.noDeposit) {
      // No change to rent, but might affect initial payment logic
    }

    setRentDetails({
      rentAmount: calculatedRent,
      billingPeriod: billingInfo.period,
      billsIncluded: billingInfo.billsIncluded,
      noDeposit: billingInfo.noDeposit,
    });

    // Navigate to the RentConfirmation screen
    navigation.navigate('RentConfirmation');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        <Stack.Screen name="Enterphone" component={Enterphone} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PropertySearchScreen" component={PropertySearchScreen} />
  <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetailsScreen} />  
  <Stack.Screen name="AdvertiserProfileScreen" component={AdvertiserProfileScreen} />
 <Stack.Screen name="RentFilterScreen" component={RentFilterScreen} options={{ headerShown: false, title: 'Rent' }} /> 
 <Stack.Screen name="BillingPeriodScreen" component={BillingPeriodScreen} options={{ headerShown: false, title: 'Billing Period' }} />
 <Stack.Screen name="AvailabilityFilterScreen" component={AvailabilityFilterScreen} />
 <Stack.Screen name="PropertyTypeFilterScreen" component={PropertyTypeFilterScreen} options={{ headerShown: false, title: 'Property Type' }} />
 <Stack.Screen name="NoOfRoomsFilterScreen" component={NoOfRoomsFilterScreen} options={{ headerShown: false, title: 'No. of Rooms' }} />
 <Stack.Screen name="FurnishedTypeFilterScreen" component={FurnishedTypeFilterScreen} options={{ headerShown: false, title: 'Furnished Type' }} />
 <Stack.Screen name="AmenitiesFilterScreen" component={AmenitiesFilterScreen} options={{ headerShown: false, title: 'Amenities' }} />
 <Stack.Screen name="SuitableForFilterScreen" component={SuitableForFilterScreen} options={{ headerShown: false, title: 'Suitable For' }} />
     
        <Stack.Screen name="SortByModal" component={SortByModal} />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearestStationScreen"
          component={NearestStationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearestSchoolScreen"
          component={NearestSchoolScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearestCollegeScreen"
          component={NearestCollegeScreen}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          name="NearestBusStopScreen"
          component={NearestBusStopScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearestAirportScreen"
          component={NearestAirportScreen}
          options={{ headerShown: false }}
        />

        {/* New Screens for Filter, Billing, and Rent Confirmation */}
        <Stack.Screen name="FilterScreen" options={{ title: 'Filters' }}>
          {(props) => <FilterScreen {...props} onApplyFilters={(appliedFilters) => handleApplyFilters(appliedFilters, props.navigation)} />}
        </Stack.Screen>
        <Stack.Screen name="BillingPeriod" options={{ title: 'Billing Period' }}>
          {(props) => (
            <BillingPeriodScreen
              {...props}
              onSelectBilling={(billingInfo) => handleSelectBilling(billingInfo, props.navigation)}
              billsIncluded={billsIncluded}
              setBillsIncluded={setBillsIncluded}
              noDeposit={noDeposit}
              setNoDeposit={setNoDeposit}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RentConfirmation" options={{ title: 'Rent Details' }}>
          {(props) => <RentConfirmationScreen {...props} rentDetails={rentDetails} />}
        </Stack.Screen>

        {/* Other existing screens */}
        <Stack.Screen
          name="PropertyApp"
          component={PropertyApp}
          options={{ headerShown: true}}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ title: 'Search Filter' }}
        />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ title: 'Reset Password' }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'slide_from_right', animationDuration: 300 }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}