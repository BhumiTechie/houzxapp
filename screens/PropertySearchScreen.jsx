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
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

// 🖼️ Import custom PNG icons
// IMPORTANT: Ensure these paths are correct relative to where this component is saved.
// For example, if this file is in 'screens/' and assets are in 'assets/', use '../assets/'.
// 🖼️ Import custom PNG icons
import WholePropertyIcon from '../assets/whole.png';
import SharedPropertyIcon from '../assets/shared.png';
import FullyFurnishedIcon from '../assets/fullyfurnished.png';
import PartFurnishedIcon from '../assets/partfurnished.png';
import UnfurnishedIcon from '../assets/unfurnished.png';
import ApartmentIcon from '../assets/apartment.png';
import BungalowIcon from '../assets/bunglaw.png';
import VillaIcon from '../assets/vila.png';
import PenthouseIcon from '../assets/penthouse.png';
import StudioIcon from '../assets/studio.png';

const PropertySearchScreen = ({ navigation }) => {
  const route = useRoute();
  const { city: initialCityParam, location: initialLocationParam } = route.params || {};

  // State variables for various filters
  const [selectedPropertyType, setSelectedPropertyType] = useState('whole');
  const [radius, setRadius] = useState(0.0);
  const [budget, setBudget] = useState(0.0);
  const [selectedRooms, setSelectedRooms] = useState('2BHK'); // Default as per screenshot
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState({
    apartment: true, // Defaulting apartment to true as per screenshot
    bungalow: false,
    villa: false,
    penthouse: false,
    studio: false,
  });
  const [selectedFurnishType, setSelectedFurnishType] = useState({
    unfurnished: false,
    partFurnished: true, // Defaulting partFurnished to true as per screenshot
    fullyFurnished: false,
  });

  // Search input states, initialized with screenshot values, overrideable by route params
  const [searchCity, setSearchCity] = useState(initialCityParam || 'Nashik');
  const [searchLocation, setSearchLocation] = useState(initialLocationParam || 'Gangapur Road');
  const [isLoading, setIsLoading] = useState(false);

  // Effect to update search inputs if route parameters are provided
  useEffect(() => {
    if (initialCityParam) setSearchCity(initialCityParam);
    if (initialLocationParam) setSearchLocation(initialLocationParam);
  }, [initialCityParam, initialLocationParam]);

  // Handler for the "Search Properties" button
  const handleSearchProperties = async () => {
    setIsLoading(true);
    // Simulate an asynchronous operation (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Navigate to 'PropertyApp' screen with all selected filter parameters
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

  // Loading indicator display
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
      <View style={styles.searchFilterContainer}>
        {/* Header Row with Back Button and Title */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Filter</Text>
          {/* Placeholder for consistent spacing, making title centered */}
          <View style={styles.invisibleIcon}>
            <Icon name="arrow-back" size={24} color="transparent" />
          </View>
        </View>

        {/* City Input Display */}
        <View style={styles.searchInputDisplay}>
          <Icon name="search" size={20} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#9CA3AF"
            style={styles.inputField}
            value={searchCity}
            editable={false} // Make it non-editable to match screenshot
          />
          {/* Clear button for city input */}
          {searchCity.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchCity('')}
              style={styles.clearButton}
            >
              <Icon name="close" size={16} color="#597C8A" />
            </TouchableOpacity>
          )}
        </View>

        {/* Location Input Display */}
        <View style={styles.searchInputDisplay}>
          <Icon name="search" size={20} color="#6b7280" style={styles.inputIcon} />
          <TextInput
            placeholder="Location or Locality"
            placeholderTextColor="#9CA3AF"
            style={styles.inputField}
            value={searchLocation}
            editable={false} // Make it non-editable to match screenshot
          />
          {/* Clear button for location input */}
          {searchLocation.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchLocation('')}
              style={styles.clearButton}
            >
              <Icon name="close" size={16} color="#597C8A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* "I am looking for" Section (Whole/Shared Property) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I am looking for,</Text>
          <View style={styles.propertyTypeContainer}>
            {[
              { key: 'whole', label: 'Whole property', icon: WholePropertyIcon },
              { key: 'shared', label: 'Shared property', icon: SharedPropertyIcon },
            ].map(({ key, label, icon }) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedPropertyType(key)}
                style={[
                  styles.propertyTypeButton,
                  selectedPropertyType === key
                    ? styles.propertyTypeButtonSelected
                    : styles.propertyTypeButtonUnselected,
                ]}
              >
                <Image
                  source={icon}
                  style={[
                    styles.iconImage,
                    { tintColor: selectedPropertyType === key ? '#fff' : '#6b7280' },
                  ]}
                />
                <Text
                  style={[
                    styles.propertyTypeButtonText,
                    selectedPropertyType === key
                      ? styles.propertyTypeButtonTextSelected
                      : styles.propertyTypeButtonTextUnselected,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Radius Slider Section */}
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

        {/* Budget Slider Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget</Text>
          <View style={styles.budgetSliderLabels}>
            <Text style={styles.budgetSliderValueLeft}>₹ {budget.toFixed(1)} L</Text>
            <Text style={styles.budgetSliderValueRight}>₹ 2.L</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={2.1} // Adjusted max value to match "₹ 2.L" in screenshot
            step={0.1}
            value={budget}
            onValueChange={setBudget}
            minimumTrackTintColor="#009CA0"
            maximumTrackTintColor="#e5e7eb"
            thumbTintColor="#009CA0"
          />
        </View>

        {/* Property Type Checkboxes (Apartment, Bungalow etc.) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          {[
            { key: 'apartment', icon: ApartmentIcon, label: 'Apartment' },
            { key: 'bungalow', icon: BungalowIcon, label: 'Bungalow' },
            { key: 'villa', icon: VillaIcon, label: 'Villa' },
            { key: 'penthouse', icon: PenthouseIcon, label: 'Penthouse' },
            { key: 'studio', icon: StudioIcon, label: 'Studio' },
          ].map(({ key, icon, label }) => {
            const isSelected = selectedPropertyTypes[key];
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  setSelectedPropertyTypes((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                style={styles.checkboxOption}
              >
                <View style={styles.checkboxOptionContent}>
                  <Image source={icon} style={styles.iconImageSmall} />
                  <Text style={styles.checkboxLabel}>{label}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    isSelected ? styles.checkboxChecked : styles.checkboxUnchecked,
                  ]}
                >
                  {isSelected && <Icon name="check" size={12} color="#ffffff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* No. of Rooms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>No. of Rooms</Text>
          <View style={styles.roomTypeContainer}>
            {['1RK', '1BHK', '2BHK', '3BHK', '4BHK', '+4BHK'].map((room) => (
              <TouchableOpacity
                key={room}
                onPress={() => setSelectedRooms(room)}
                style={[
                  styles.roomButton,
                  selectedRooms === room ? styles.roomButtonSelected : styles.roomButtonUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.roomButtonText,
                    selectedRooms === room ? styles.roomButtonTextSelected : styles.roomButtonTextUnselected,
                  ]}
                >
                  {room}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Furnish Types Checkboxes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Furnish Type</Text>
          {Object.entries(selectedFurnishType).map(([key, value]) => {
            // Convert camelCase key to readable label (e.g., 'partFurnished' to 'Part-Furnished')
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace(' ', '-');
            const icon =
              key === 'fullyFurnished'
                ? FullyFurnishedIcon
                : key === 'unfurnished'
                  ? UnfurnishedIcon
                  : PartFurnishedIcon;

            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  setSelectedFurnishType((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                style={styles.checkboxOption}
              >
                <View style={styles.checkboxOptionContent}>
                  <Image source={icon} style={styles.iconImageSmall} />
                  <Text style={styles.checkboxLabel}>{label}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    value ? styles.checkboxChecked : styles.checkboxUnchecked,
                  ]}
                >
                  {value && <Icon name="check" size={12} color="#ffffff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Search Properties Button */}
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
    backgroundColor: '#05141A', // Dark background as in screenshot header
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  headerRow: { // Style for the header with back button and title
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: { marginBottom: 0, paddingTop: 0 }, // Adjusted as it's part of headerRow now
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  invisibleIcon: { width: 24, alignItems: 'center', justifyContent: 'center' }, // For centering the title

  searchInputDisplay: { // Style for the search input appearance in header (non-editable)
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#1F2937', // Darker background for the input fields
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 48, // Fixed height for better alignment
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
  scrollContent: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  section: { marginTop: 24 },
  sectionTitle: { color: '#222222', fontSize: 16, marginBottom: 12, fontWeight: '800' },
  propertyTypeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: -4 },
  propertyTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    minHeight: 80, // Ensure height for content
  },
  propertyTypeButtonSelected: { backgroundColor: '#009CA0' },
  propertyTypeButtonUnselected: { backgroundColor: '#f3f4f6' },
  propertyTypeButtonText: { fontSize: 14, marginTop: 8, fontWeight: '600' },
  propertyTypeButtonTextSelected: { color: '#ffffff' },
  propertyTypeButtonTextUnselected: { color: '#6b7280' },
  sliderValue: { color: '#6b7280', fontSize: 14, marginBottom: 8, alignSelf: 'flex-end' }, // Align radius value to right
  budgetSliderLabels: { // New style for budget slider labels
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetSliderValueLeft: { color: '#6b7280', fontSize: 14 },
  budgetSliderValueRight: { color: '#6b7280', fontSize: 14 },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1, // Add subtle separator
    borderBottomColor: '#f3f4f6', // Light gray separator
  },
  checkboxOptionContent: { flexDirection: 'row', alignItems: 'center' },
  checkboxLabel: { color: '#374151', fontSize: 16, marginLeft: 12 },
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
  iconImage: { width: 32, height: 32, resizeMode: 'contain', marginBottom: 4 }, // Increased size slightly for property type buttons
  iconImageSmall: { width: 24, height: 24, resizeMode: 'contain' }, // Consistent with screenshot
  searchButtonContainer: { paddingHorizontal: 16, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#f3f4f6' }, // Add a border top
  searchButton: {
    backgroundColor: '#009CA0',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '500' },
  // Styles for "No. of Rooms"
  roomTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to next line
    justifyContent: 'flex-start', // Align to start
    gap: 8, // Space between items
  },
  roomButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  roomButtonSelected: {
    backgroundColor: '#009CA0',
    borderColor: '#009CA0',
  },
  roomButtonUnselected: {
    backgroundColor: '#f3f4f6',
    borderColor: '#f3f4f6',
  },
  roomButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  roomButtonTextSelected: {
    color: '#ffffff',
  },
  roomButtonTextUnselected: {
    color: '#6b7280',
  },
});

export default PropertySearchScreen;