// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TextInput, StyleSheet, TouchableOpacity,
//   SafeAreaView, Modal, ActivityIndicator
// } from 'react-native';
// import axios from 'axios';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'; // ✅ Navigation import
// import * as Location from 'expo-location';


// export default function SearchFilterScreen() {
//   const navigation = useNavigation(); // ✅ Use navigation

//   const [recentSearches, setRecentSearches] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestion, setSuggestion] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isCityFocused, setIsCityFocused] = useState(false);
//   const [isLocationFocused, setIsLocationFocused] = useState(false);
  
 
//   useEffect(() => {
//     if (searchQuery.length < 3) {
//       setSuggestion(null);
//       return;
//     }

//     const timer = setTimeout(() => {
//       fetchCities(searchQuery);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const fetchCities = async (query) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
//         params: { namePrefix: query, limit: 1 },
//         headers: {
//           'X-RapidAPI-Key': '2a701ead6bmshd7881da02f5cfb8p1be038jsn7249c1948c19',
//           'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//         }
//       });
//       if (response.data.data.length > 0) {
//         setSuggestion(response.data.data[0]);
//       } else {
//         setSuggestion(null);
//       }
//     } catch (error) {
//       console.error('Error fetching city:', error);
//       setSuggestion(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectCity = (cityData) => {
//     const cityInfo = { city: cityData.city, state: cityData.region };
//     setSelectedCity(cityInfo);
//     setSearchQuery(`${cityData.city}, ${cityData.region}`);
//     setSuggestion(null);

//     if (!recentSearches.find(r => r.city === cityData.city)) {
//       setRecentSearches([cityInfo, ...recentSearches]);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.headerArea}>
//         <View style={styles.headerTop}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Search Filter</Text>
//         </View>

//         {/* Choose City Input */}
//         {/* <View style={[
//           styles.inputWrapper,
//           {
//             borderColor: isCityFocused || searchQuery ? '#FFFFFF' : '#1E2B31',
//           }
//         ]}>
//           <TextInput
//             placeholder="Choose City"
//             placeholderTextColor={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             onFocus={() => setIsCityFocused(true)}
//             onBlur={() => setIsCityFocused(false)}
//             style={[
//               styles.placeholder,
//               { color: isCityFocused || searchQuery ? '#FFFFFF' : '#667085' }
//             ]}
//           />
//           {loading ? (
//             <ActivityIndicator size="small" color="#00AEEF" />
//           ) : (
//             searchQuery.length > 0 && (
//               <TouchableOpacity onPress={() => setSearchQuery('')}>
//                 <Ionicons name="close-circle" size={20} color="#98A2B3" />
//               </TouchableOpacity>
//             )
//           )}
//         </View> */}
//         <View style={[
//   styles.inputWrapper,
//   { borderColor: isCityFocused || searchQuery ? '#FFFFFF' : '#1E2B31' }
// ]}>
//   <Ionicons name="search" size={18} color={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'} style={{ marginRight: 8 }} />
//   <TextInput
//     placeholder="Choose City"
//     placeholderTextColor={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'}
//     value={searchQuery}
//     onChangeText={setSearchQuery}
//     onFocus={() => setIsCityFocused(true)}
//     onBlur={() => setIsCityFocused(false)}
//     style={[styles.placeholder, { color: isCityFocused || searchQuery ? '#FFFFFF' : '#667085' }]}
//   />
//   {loading ? (
//     <ActivityIndicator size="small" color="#00AEEF" />
//   ) : (
//     searchQuery.length > 0 && (
//       <TouchableOpacity onPress={() => setSearchQuery('')}>
//         <Ionicons name="close-circle" size={20} color="#98A2B3" />
//       </TouchableOpacity>
//     )
//   )}
// </View>


//         {/* Suggestions */}
//         {suggestion && (
//           <TouchableOpacity
//             onPress={() => handleSelectCity(suggestion)}
//             style={{ marginLeft: 20, marginTop: 4 }}
//           >
//             <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
//               {suggestion.city}, {suggestion.region}
//             </Text>
//           </TouchableOpacity>
//         )}

//         {/* Location or Locality */}
//         <TouchableOpacity style={[
//           styles.inputWrapper,
//           {
//             borderColor: isLocationFocused ? '#FFFFFF' : '#1E2B31',
//           }
//         ]}>
//           <TextInput
//             placeholder="Search location or locality."
//             placeholderTextColor={isLocationFocused ? '#FFFFFF' : '#667085'}
//             onFocus={() => setIsLocationFocused(true)}
//             onBlur={() => setIsLocationFocused(false)}
//             style={[
//               styles.placeholder,
//               { color: isLocationFocused ? '#FFFFFF' : '#667085' }
//             ]}
//           />
//           <Ionicons name="chevron-forward" size={20} color="#98A2B3" />
//         </TouchableOpacity>

//         {/* <TouchableOpacity style={styles.currentLocation}>
//           <Feather name="settings" size={16} color="white" />
//           <Text style={styles.currentLocationText}>Use current location</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity
//   style={styles.currentLocation}
//   onPress={async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission to access location was denied');
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = loc.coords;

//       // Optional: Get readable address from lat/lng
//       let geo = await Location.reverseGeocodeAsync({ latitude, longitude });
//       if (geo.length > 0) {
//         const place = geo[0];
//         const cityInfo = {
//           city: place.city || place.name || 'Unknown',
//           state: place.region || '',
//           lat: latitude,
//           lng: longitude,
//         };

//         setSelectedCity(cityInfo);
//         setSearchQuery(`${cityInfo.city}, ${cityInfo.state}`);
//         setLocation('Using current location');

//         if (!recentSearches.find(r => r.city === cityInfo.city)) {
//           setRecentSearches([cityInfo, ...recentSearches]);
//         }

//         // ✅ Navigate to next screen
//         navigation.navigate('NextScreenName', { cityInfo });
//       }
//     } catch (error) {
//       console.error('Error getting location:', error);
//     }
//   }}
// >
//   <Feather name="settings" size={16} color="white" />
//   <Text style={styles.currentLocationText}>Use current location</Text>
// </TouchableOpacity>

//       </View>

//       {/* Recent Searches */}
//       <View style={styles.listSection}>
//         {recentSearches.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
//             {recentSearches.map((item, index) => (
//               <TouchableOpacity key={index} style={styles.listRow}>
//                 <Text style={styles.cityName}>{item.city}</Text>
//                 <Text style={styles.cityDetail}>{item.state.toUpperCase()}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity onPress={() => setShowModal(true)}>
//               <Text style={styles.clearText}>Clear Recent Search</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>

//       {/* Modal */}
//       <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Clear Recent Search</Text>
//             <Text style={styles.modalMessage}>Would you like to clear all recent searches?</Text>
//             <View style={styles.modalActions}>
//               <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalBtnOutline}>
//                 <Text style={{ color: '#101828' }}>No</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => { setRecentSearches([]); setShowModal(false); }} style={styles.modalBtnFill}>
//                 <Text style={{ color: 'white' }}>Clear</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
//   headerArea: {
//     backgroundColor: '#05141A',
//     paddingBottom: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20
//   },
//   headerTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 32, // ✅ Arrow thoda upar
//     marginBottom: 16
//   },
//   headerTitle: {
//     flex: 1,
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600'
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1E2B31',
//     borderRadius: 8,
//     borderWidth: 1,
//     paddingHorizontal: 16,
//     height: 48,
//     width: '90%',
//     alignSelf: 'center',
//     marginBottom: 12,
//   },
//   placeholder: {
//     flex: 1,
//     fontSize: 16,
//   },
//   currentLocation: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 16
//   },
//   currentLocationText: {
//     color: '#fff',
//     fontSize: 14,
//     marginLeft: 8
//   },
//   listSection: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 20
//   },
//   sectionTitle: {
//     color: '#98A2B3',
//     fontSize: 12,
//     marginBottom: 12
//   },
//   listRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#EAECF0',
//   },
//   cityName: {
//     fontSize: 16,
//     color: '#101828',
//     fontWeight: '500'
//   },
//   cityDetail: {
//     fontSize: 12,
//     color: '#667085'
//   },
//   clearText: {
//     color: '#00AEEF',
//     fontWeight: '600',
//     marginTop: 16
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 16,  
//     padding: 24,
//     alignItems: 'center'
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10
//   },
//   modalMessage: {
//     fontSize: 14,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 20
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%'
//   },
//   modalBtnOutline: {
//     flex: 1,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: 8,
//     marginRight: 8,
//     alignItems: 'center'
//   },
//   modalBtnFill: {
//     flex: 1,
//     paddingVertical: 12,
//     backgroundColor: '#00AEEF',
//     borderRadius: 8,
//     marginLeft: 8,
//     alignItems: 'center'
//   }
// });
// import React, { useState, useEffect } from 'react';
// File: SearchFilterScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  SafeAreaView, Modal, ActivityIndicator, Alert
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SearchFilterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialCity = route.params?.city || '';

  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialCity);
  const [location, setLocation] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCityFocused, setIsCityFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [loadingLocationSuggestions, setLoadingLocationSuggestions] = useState(false);

  const fetchCities = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestion([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
        params: { namePrefix: query, limit: 5 },
        headers: {
          'X-RapidAPI-Key': '2a701ead6bmshd7881da02f5cfb8p1be038jsn7249c1948c19',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });
      const filtered = response.data.data.filter(item => item?.city?.toLowerCase() !== 'script');
      setSuggestion(filtered);
    } catch (error) {
      console.warn('City fetch failed:', error.message);
      setSuggestion([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLocationSuggestions = useCallback(async (query) => {
    if (!selectedCity) {
      Alert.alert('Select City', 'Please select a city before searching locality.');
      return;
    }
    if (!query || query.length < 2) {
      setLocationSuggestions([]);
      setLoadingLocationSuggestions(false);
      return;
    }
    setLoadingLocationSuggestions(true);
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: `${query}, ${selectedCity.city}`,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          'User-Agent': 'FindMyPlaceApp/1.0 (bhumikagupta573@gmail.com)'
        },
      });
      const filtered = response.data.filter(item => item?.display_name?.toLowerCase() !== 'script');
      setLocationSuggestions(filtered);
    } catch (error) {
      console.warn('Location fetch failed:', error.message);
      setLocationSuggestions([]);
    } finally {
      setLoadingLocationSuggestions(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (initialCity.length > 0) {
      fetchCities(initialCity);
    }
  }, [initialCity, fetchCities]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestion([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchCities(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchCities]);

  const handleSelectCity = useCallback((cityData) => {
    const cityInfo = { city: cityData.city, state: cityData.region };
    setSelectedCity(cityInfo);
    setSearchQuery(`${cityData.city}, ${cityData.region}`);
    setSuggestion([]);
    setLocation('');
    setLocationSuggestions([]);

    if (!recentSearches.find(r => r.city === cityData.city)) {
      setRecentSearches([cityInfo, ...recentSearches]);
    }
  }, [recentSearches]);

  const getCurrentLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required.');
      return;
    }
    try {
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const address = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (address.length > 0) {
        const addr = address[0];
        const city = addr.city || addr.subregion || '';
        const state = addr.region || '';
        const locality = addr.district || addr.name || '';

        setSelectedCity({ city, state });
        setSearchQuery(`${city}, ${state}`);
        setLocation(locality);

        if (!recentSearches.find(r => r.city === city)) {
          setRecentSearches([{ city, state }, ...recentSearches]);
        }

        navigation.navigate('PropertySearchScreen', {
          city,
          state,
          location: locality
        });
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to get current location.');
    }
  }, [recentSearches, navigation]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    setShowModal(false);
  }, []);

  const handleRecentSearchPress = useCallback((item) => {
    setSearchQuery(`${item.city}, ${item.state}`);
    setSelectedCity(item);
    setLocation('');
    setLocationSuggestions([]);
    navigation.navigate('PropertySearchScreen', {
      city: item.city,
      state: item.state,
      location: `${item.city}, ${item.state}`
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerArea}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Filter</Text>
        </View>

        <View style={[styles.inputWrapper, { borderColor: isCityFocused || searchQuery ? '#FFFFFF' : '#1E2B31' }]}>
          <Ionicons name="search" size={18} color={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Choose City"
            placeholderTextColor={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsCityFocused(true)}
            onBlur={() => setIsCityFocused(false)}
            style={[styles.placeholder, { color: isCityFocused || searchQuery ? '#FFFFFF' : '#667085' }]}
          />
          {loading ? <ActivityIndicator size="small" color="#00AEEF" /> : searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#98A2B3" />
            </TouchableOpacity>
          )}
        </View>

        {suggestion.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestion.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectCity(item)} style={styles.suggestionItem}>
                <Text style={{ color: '#fff' }}>{item.city}, {item.region}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={[styles.inputWrapper, { borderColor: isLocationFocused || location ? '#FFFFFF' : '#1E2B31' }]}>
          <Feather name="map-pin" size={18} color={isLocationFocused || location ? '#FFFFFF' : '#667085'} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search locality (within selected city)"
            placeholderTextColor={isLocationFocused || location ? '#FFFFFF' : '#667085'}
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              fetchLocationSuggestions(text);
            }}
            onFocus={() => setIsLocationFocused(true)}
            onBlur={() => setIsLocationFocused(false)}
            style={[styles.placeholder, { color: isLocationFocused || location ? '#FFFFFF' : '#667085' }]}
          />
          {loadingLocationSuggestions ? <ActivityIndicator size="small" color="#00AEEF" /> : location.length > 0 && (
            <TouchableOpacity onPress={() => {
              setLocation('');
              setLocationSuggestions([]);
            }}>
              <Ionicons name="close-circle" size={20} color="#98A2B3" />
            </TouchableOpacity>
          )}
        </View>

        {locationSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {locationSuggestions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestionItem}
                onPress={() => {
                  const address = item.address || {};
                  const locality = item.display_name;

                  setLocation(locality);
                  setLocationSuggestions([]);

                  navigation.navigate('PropertySearchScreen', {
                    city: selectedCity.city,
                    state: selectedCity.state,
                    location: locality
                  });
                }}>
                <Text style={{ color: '#FFFFFF' }}>{item.display_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={getCurrentLocation} style={styles.currentLocation}>
          <Feather name="crosshair" size={16} color="white" />
          <Text style={styles.currentLocationText}>Use current location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        {recentSearches.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
            {recentSearches.map((item, index) => (
              <TouchableOpacity key={index} style={styles.listRow} onPress={() => handleRecentSearchPress(item)}>
                <Text style={styles.cityName}>{item.city}</Text>
                <Text style={styles.cityDetail}>{item.state?.toUpperCase() || 'N/A'}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.clearText}>Clear Recent Search</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear Recent Search</Text>
            <Text style={styles.modalMessage}>Would you like to clear all recent searches?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalBtnOutline}>
                <Text style={{ color: '#101828' }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearRecentSearches} style={styles.modalBtnFill}>
                <Text style={{ color: 'white' }}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  headerArea: {
    backgroundColor: '#05141A',
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    marginBottom: 16
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2B31',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 8
  },
  currentLocationText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20
  },
  sectionTitle: {
    color: '#98A2B3',
    fontSize: 12,
    marginBottom: 12
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  cityName: {
    fontSize: 16,
    color: '#101828',
    fontWeight: '500'
  },
  cityDetail: {
    fontSize: 12,
    color: '#667085'
  },
  clearText: {
    color: '#00AEEF',
    fontWeight: '600',
    marginTop: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalBtnOutline: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  modalBtnFill: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#00AEEF',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  suggestionsContainer: {
    backgroundColor: '#1E2B31',
    maxHeight: 150,
    marginHorizontal: '5%',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 1000,
    position: 'absolute',
    top: 108, // Adjust based on your header and input height
    left: '5%',
    width: '90%',
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334A57',
  },
});