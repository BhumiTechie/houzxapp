import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  SafeAreaView, Modal, ActivityIndicator, Alert, Image, Dimensions, Platform, ScrollView
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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
          'User-Agent': 'FindMyPlaceApp/1.0 (email@example.com)' // Update your email
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
    if (initialCity.length > 0) fetchCities(initialCity);
  }, [initialCity]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestion([]);
      return;
    }
    const timer = setTimeout(() => fetchCities(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
  }, [recentSearches]);

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
  }, []);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.headerArea}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search Filter</Text>
          </View>

          {/* City Input */}
          <View style={styles.inputWrapper(isCityFocused || searchQuery)}>
            <Ionicons name="search" size={18} color={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'} />
            <TextInput
              placeholder="Choose City"
              placeholderTextColor={isCityFocused || searchQuery ? '#FFFFFF' : '#667085'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsCityFocused(true)}
              onBlur={() => setIsCityFocused(false)}
              style={styles.inputText(isCityFocused || searchQuery)}
            />
            {loading ? (
              <ActivityIndicator size="small" color="#00AEEF" />
            ) : searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#98A2B3" />
              </TouchableOpacity>
            )}
          </View>

          {/* City Suggestions */}
          {suggestion.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestion.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleSelectCity(item)} style={styles.suggestionItem}>
                  <Text style={{ color: '#fff' }}>{item.city}, {item.region}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Locality Input */}
          <View style={styles.inputWrapper(isLocationFocused || location)}>
            <Feather name="map-pin" size={18} color={isLocationFocused || location ? '#FFFFFF' : '#667085'} />
            <TextInput
              placeholder="Search location or locality."
              placeholderTextColor={isLocationFocused || location ? '#FFFFFF' : '#667085'}
              value={location}
              onChangeText={(text) => {
                setLocation(text);
                fetchLocationSuggestions(text);
              }}
              onFocus={() => setIsLocationFocused(true)}
              onBlur={() => setIsLocationFocused(false)}
              style={styles.inputText(isLocationFocused || location)}
            />
            {loadingLocationSuggestions ? (
              <ActivityIndicator size="small" color="#00AEEF" />
            ) : location.length > 0 && (
              <TouchableOpacity onPress={() => {
                setLocation('');
                setLocationSuggestions([]);
              }}>
                <Ionicons name="close-circle" size={20} color="#98A2B3" />
              </TouchableOpacity>
            )}
          </View>

          {/* Locality Suggestions */}
          {locationSuggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {locationSuggestions.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.suggestionItem}
                  onPress={() => {
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
            <Image
              source={require('../assets/currentlocation.png')}
              style={styles.locationImage}
            />
            <Text style={styles.currentLocationText}>Use current location</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Searches */}
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

        {/* Modal */}
        <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Clear Recent Search</Text>
              <Text style={styles.modalMessage}>Would you like to clear all recent searches?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalBtnOutline}>
                  <Text style={{ color: '#009CA0' }}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearRecentSearches} style={styles.modalBtnFill}>
                  <Text style={{ color: 'white' }}>Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

// Responsive Styles
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    marginBottom: 16
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600'
  },
  inputWrapper: (active) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2B31',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: active ? '#FFFFFF' : '#1E2B31',
    paddingHorizontal: 12,
    height: 48,
    marginHorizontal: '5%',
    marginBottom: 12
  }),
  inputText: (active) => ({
    flex: 1,
    fontSize: 16,
    color: active ? '#FFFFFF' : '#667085',
    marginHorizontal: 8
  }),
  suggestionsContainer: {
    backgroundColor: '#1E2B31',
    maxHeight: 150,
    marginHorizontal: '5%',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334A57',
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: 8
  },
  locationImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  currentLocationText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8
  },
  listSection: {
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
    color: '#009CA0',
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
    color: '#5E5E5E',
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
    borderColor: '#009CA0',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center'
  },
  modalBtnFill: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#009CA0',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  }
});
