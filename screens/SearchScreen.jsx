import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Switch , Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [useLocation, setUseLocation] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const cities = [
    { city: 'Pune', state: 'Maharashtra' },
    { city: 'Mumbai', state: 'Maharashtra' },
    { city: 'Nashik', state: 'Maharashtra' },
    { city: 'Nagpur', state: 'Maharashtra' },
    
  ];

  const filteredCities = cities.filter(item =>
    item.city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filteredLocations = cities.filter(item =>
    item.city.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Search Filter</Text>

        <View style={styles.inputSection}>
          <View style={styles.inputBox}>
            <Ionicons name="location-outline" size={18} color="#bbb" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              placeholder="Choose City"
              placeholderTextColor="#bbb"
              value={citySearch}
              onChangeText={setCitySearch}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="search-outline" size={18} color="#bbb" style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              placeholder="Search location or locality."
              placeholderTextColor="#bbb"
              value={locationSearch}
              onChangeText={setLocationSearch}
            />
          </View>
          <View style={styles.useLocationRow}>
  <Image source={require('../assets/location.png')} style={styles.useLocationIcon}/>
  <Text style={styles.useLocationText}>Use current location</Text>
</View>

        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.recentTitle}>RESULTS</Text>

        <FlatList
          data={citySearch.length > 0 ? filteredCities : filteredLocations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recentItem}>
              <Text style={styles.cityName}>{item.city}</Text>
              <Text style={styles.stateName}>{item.state.toUpperCase()}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: '#bbb', textAlign: 'center', marginTop: 20 }}>
              No results found
            </Text>
          }
        />

        {(citySearch.length === 0 && locationSearch.length === 0) && (
          <TouchableOpacity>
            <Text style={styles.clearRecentText}>Clear Recent Search</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    backgroundColor: '#05141A',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputSection: {
    gap: 16,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  useLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  useLocationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  useLocationText: {
    color: '#fff',
    fontSize: 16,
  },
  
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  recentTitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityName: {
    fontSize: 16,
    color: '#05141A',
  },
  stateName: {
    fontSize: 12,
    color: '#bbb',
    textTransform: 'uppercase',
  },
  clearRecentText: {
    color: '#00AEEF',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },
});
