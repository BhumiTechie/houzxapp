import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext'; // ✅ Context import



// Screens
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
import BuyScreen from './screens/BuyScreen';

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
import AccountScreen from './screens/AccountScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyAdsScreen from './screens/MyAdsScreen';
import EditAdScreen from './screens/EditAdScreen';
import { AdProvider } from './context/AdContext';
import EmailScreen from './screens/EmailScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  const [filters, setFilters] = useState({});
  const [billingDetails, setBillingDetails] = useState({});
  const [rentDetails, setRentDetails] = useState({});
  const [billsIncluded, setBillsIncluded] = useState(false);
  const [noDeposit, setNoDeposit] = useState(false);

  const handleApplyFilters = (appliedFilters, navigation) => {
    setFilters(appliedFilters);
    navigation.navigate('BillingPeriod');
  };

  const handleSelectBilling = (billingInfo, navigation) => {
    setBillingDetails(billingInfo);

    let calculatedRent = billingInfo.period === 'Monthly' ? 12000 : 144000;
    if (billingInfo.billsIncluded) calculatedRent += 500;

    setRentDetails({
      rentAmount: calculatedRent,
      billingPeriod: billingInfo.period,
      billsIncluded: billingInfo.billsIncluded,
      noDeposit: billingInfo.noDeposit,
    });

    navigation.navigate('RentConfirmation');
  };

  return (
    <UserProvider> {/* ✅ WRAPPED HERE */}
    <AdProvider>
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
         <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
          <Stack.Screen name="Enterphone" component={Enterphone} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BuyScreen" component={BuyScreen} />
          <Stack.Screen name="PropertySearchScreen" component={PropertySearchScreen} />
          <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetailsScreen} />
          <Stack.Screen name="AdvertiserProfileScreen" component={AdvertiserProfileScreen} />
          <Stack.Screen name="RentFilterScreen" component={RentFilterScreen} />
          <Stack.Screen name="AvailabilityFilterScreen" component={AvailabilityFilterScreen} />
          <Stack.Screen name="PropertyTypeFilterScreen" component={PropertyTypeFilterScreen} />
          <Stack.Screen name="NoOfRoomsFilterScreen" component={NoOfRoomsFilterScreen} />
          <Stack.Screen name="FurnishedTypeFilterScreen" component={FurnishedTypeFilterScreen} />
          <Stack.Screen name="AmenitiesFilterScreen" component={AmenitiesFilterScreen} />
          <Stack.Screen name="SuitableForFilterScreen" component={SuitableForFilterScreen} />
          <Stack.Screen name="SortByModal" component={SortByModal} />
          <Stack.Screen name="NearestStationScreen" component={NearestStationScreen} />
          <Stack.Screen name="NearestSchoolScreen" component={NearestSchoolScreen} />
          <Stack.Screen name="NearestCollegeScreen" component={NearestCollegeScreen} />
          <Stack.Screen name="NearestBusStopScreen" component={NearestBusStopScreen} />
          <Stack.Screen name="NearestAirportScreen" component={NearestAirportScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="PropertyApp" component={PropertyApp} />
           <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
             <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
             <Stack.Screen name="MyAds" component={MyAdsScreen} />
             <Stack.Screen name="EditAd" component={EditAdScreen} />
           <Stack.Screen name="ChangeEmail" component={EmailScreen} />
     


          {/* Dynamic Screens */}
          <Stack.Screen name="FilterScreen">
            {(props) => (
              <FilterScreen
                {...props}
                onApplyFilters={(appliedFilters) => handleApplyFilters(appliedFilters, props.navigation)}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="BillingPeriod">
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
       

          <Stack.Screen name="RentConfirmation">
            {(props) => <RentConfirmationScreen {...props} rentDetails={rentDetails} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      </AdProvider>
    </UserProvider>
  );
}
