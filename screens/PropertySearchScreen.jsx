import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const PropertySearchScreen = ({ navigation }) => {
  const route = useRoute();
  const { city: initialCityParam, location: initialLocationParam } = route.params || {};

  const [selectedPropertyType, setSelectedPropertyType] = useState('whole');
  const [radius, setRadius] = useState(0.0);
  const [budget, setBudget] = useState(0.0);
  const [selectedRooms, setSelectedRooms] = useState('2BHK');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState({
    apartment: true,
    bungalow: false,
    villa: false,
    penthouse: false,
    studio: false,
  });
  const [selectedFurnishType, setSelectedFurnishType] = useState({
    unfurnished: false,
    partFurnished: true,
    fullyFurnished: false,
  });

  const [searchCity, setSearchCity] = useState(initialCityParam || '');
  const [searchLocation, setSearchLocation] = useState(initialLocationParam || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialCityParam) setSearchCity(initialCityParam);
    if (initialLocationParam) setSearchLocation(initialLocationParam);
  }, [initialCityParam, initialLocationParam]);

  const handleSearchProperties = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    navigation.navigate('PropertyApp', {
      city: searchCity,
      location: searchLocation,
      propertyTypes: Object.keys(selectedPropertyTypes).filter((key) => selectedPropertyTypes[key]),
      rooms: selectedRooms,
      furnishType: Object.keys(selectedFurnishType).filter((key) => selectedFurnishType[key]),
      budget,
      radius,
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#009CA0" />
        <Text style={styles.loadingText}>Searching Properties...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔲 Header with Search Filter */}
      <View style={styles.searchFilterContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Filter</Text>

        {/* City Input */}
        <View style={styles.searchInputBox}>
          <Icon name="search" size={20} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#9CA3AF"
            style={styles.inputField}
            value={searchCity}
            onChangeText={setSearchCity}
          />
          {searchCity.length > 0 && (
            <TouchableOpacity onPress={() => setSearchCity('')} style={styles.clearButton}>
              <Icon name="close" size={16} color="#597C8A" />
            </TouchableOpacity>
          )}
        </View>

        {/* Location Input */}
        <View style={styles.searchInputBox}>
          <Icon name="search" size={20} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            placeholder="Location or Locality"
            placeholderTextColor="#9CA3AF"
            style={styles.inputField}
            value={searchLocation}
            onChangeText={setSearchLocation}
          />
          {searchLocation.length > 0 && (
            <TouchableOpacity onPress={() => setSearchLocation('')} style={styles.clearButton}>
              <Icon name="close" size={16} color="#597C8A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView style={{ flex: 1, marginTop: 280, paddingHorizontal: 16 }}>
        {/* Property Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I am looking for,</Text>
          <View style={styles.propertyTypeContainer}>
            <TouchableOpacity
              onPress={() => setSelectedPropertyType('whole')}
              style={[
                styles.propertyTypeButton,
                selectedPropertyType === 'whole' ? styles.propertyTypeButtonSelected : styles.propertyTypeButtonUnselected,
              ]}
            >
              <Icon name="home" size={24} color={selectedPropertyType === 'whole' ? '#ffffff' : '#6b7280'} />
              <Text style={[styles.propertyTypeButtonText, selectedPropertyType === 'whole' ? styles.propertyTypeButtonTextSelected : styles.propertyTypeButtonTextUnselected]}>
                Whole property
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedPropertyType('shared')}
              style={[
                styles.propertyTypeButton,
                selectedPropertyType === 'shared' ? styles.propertyTypeButtonSelected : styles.propertyTypeButtonUnselected,
              ]}
            >
              <Icon name="apartment" size={24} color={selectedPropertyType === 'shared' ? '#ffffff' : '#6b7280'} />
              <Text style={[styles.propertyTypeButtonText, selectedPropertyType === 'shared' ? styles.propertyTypeButtonTextSelected : styles.propertyTypeButtonTextUnselected]}>
                Shared property
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Radius */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Radius</Text>
          <Text style={styles.sliderValue}>{radius.toFixed(1)} km</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={6}
            step={0.1}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor="#009CA0"
            maximumTrackTintColor="#e5e7eb"
            thumbTintColor="#009CA0"
          />
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget</Text>
          <Text style={styles.sliderValue}>₹ {budget.toFixed(1)} L</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={2}
            step={0.1}
            value={budget}
            onValueChange={setBudget}
            minimumTrackTintColor="#009CA0"
            maximumTrackTintColor="#e5e7eb"
            thumbTintColor="#009CA0"
          />
        </View>

        {/* Property Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          {Object.entries(selectedPropertyTypes).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedPropertyTypes((prev) => ({ ...prev, [key]: !prev[key] }))}
              style={styles.checkboxOption}
            >
              <View style={styles.checkboxOptionContent}>
                <Icon name="home" size={20} color="#6b7280" style={styles.checkboxIcon} />
                <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              </View>
              <View style={[styles.checkbox, value ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                {value && <Icon name="check" size={12} color="#ffffff" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rooms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No. of Rooms</Text>
          <View style={styles.roomsContainer}>
            {['1RK', '1BHK', '2BHK', '3BHK', '4BHK', '+4BHK'].map((room) => (
              <TouchableOpacity
                key={room}
                onPress={() => setSelectedRooms(room)}
                style={[
                  styles.roomButton,
                  selectedRooms === room ? styles.roomButtonSelected : styles.roomButtonUnselected,
                ]}
              >
                <Text style={[styles.roomButtonText, selectedRooms === room ? styles.roomButtonTextSelected : styles.roomButtonTextUnselected]}>
                  {room}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Furnish Type */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Furnish Type</Text>
          {Object.entries(selectedFurnishType).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelectedFurnishType((prev) => ({ ...prev, [key]: !prev[key] }))}
              style={styles.checkboxOption}
            >
              <View style={styles.checkboxOptionContent}>
                <Text style={styles.checkboxLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </Text>
              </View>
              <View style={[styles.checkbox, value ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                {value && <Icon name="check" size={12} color="#ffffff" />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Button */}
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchProperties}>
          <Text style={styles.searchButtonText}>Search Properties</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 20, fontSize: 16, color: '#374151' },

  searchFilterContainer: {
    backgroundColor: '#05141A',
    width: 393,
    height: 152,
    position: 'absolute',
    top: 108,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 2,
  },
  backButton: { marginBottom: 12 },
  headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: '500', marginBottom: 12 },
  searchInputBox: {
    width: 361,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: { marginRight: 8 },
  inputField: { flex: 1, color: '#ffffff', fontSize: 16 },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    marginLeft: 8,
  },
  section: { marginTop: 24 },
  lastSection: { marginBottom: 24 },
  sectionTitle: { color: '#374151', fontSize: 16, marginBottom: 12 },
  propertyTypeContainer: { flexDirection: 'row' },
  propertyTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  propertyTypeButtonSelected: { backgroundColor: '#009CA0' },
  propertyTypeButtonUnselected: { backgroundColor: '#f3f4f6' },
  propertyTypeButtonText: { fontSize: 12, marginTop: 8 },
  propertyTypeButtonTextSelected: { color: '#ffffff' },
  propertyTypeButtonTextUnselected: { color: '#6b7280' },
  sliderValue: { color: '#6b7280', fontSize: 14, marginBottom: 8 },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  checkboxOptionContent: { flexDirection: 'row', alignItems: 'center' },
  checkboxIcon: { marginRight: 12 },
  checkboxLabel: { color: '#374151', fontSize: 16 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#009CA0', borderColor: '#009CA0' },
  checkboxUnchecked: { borderColor: '#d1d5db' },
  roomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomButton: {
    width: '30%',
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    marginHorizontal: '1.5%',
  },
  roomButtonSelected: { backgroundColor: '#009CA0' },
  roomButtonUnselected: { backgroundColor: '#f3f4f6' },
  roomButtonText: { fontSize: 14 },
  roomButtonTextSelected: { color: '#ffffff' },
  roomButtonTextUnselected: { color: '#374151' },
  searchButtonContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  searchButton: {
    backgroundColor: '#009CA0',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '500' },
});

export default PropertySearchScreen;

