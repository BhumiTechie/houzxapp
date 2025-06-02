import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';


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
    const [isLoading, setIsLoading] = useState(false); // State for loading

    useEffect(() => {
        console.log('PropertySearchScreen mounted');
        if (initialCityParam) {
            console.log('Received City:', initialCityParam);
            setSearchCity(initialCityParam);
        }
        if (initialLocationParam) {
            console.log('Received Location:', initialLocationParam);
            setSearchLocation(initialLocationParam);
        }
    }, [initialCityParam, initialLocationParam]);

    const PropertyTypeButton = ({ type, iconName, selected, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.propertyTypeButton,
                selected ? styles.propertyTypeButtonSelected : styles.propertyTypeButtonUnselected,
            ]}
        >
            <Icon name={iconName} size={24} color={selected ? '#ffffff' : '#6b7280'} />
            <Text
                style={[
                    styles.propertyTypeButtonText,
                    selected ? styles.propertyTypeButtonTextSelected : styles.propertyTypeButtonTextUnselected,
                ]}
            >
                {type}
            </Text>
        </TouchableOpacity>
    );

    const CheckboxOption = ({ label, checked, onPress, iconName }) => (
        <TouchableOpacity onPress={onPress} style={styles.checkboxOption}>
            <View style={styles.checkboxOptionContent}>
                {iconName && <Icon name={iconName} size={20} color="#6b7280" style={styles.checkboxIcon} />}
                <Text style={styles.checkboxLabel}>{label}</Text>
            </View>
            <View
                style={[styles.checkbox, checked ? styles.checkboxChecked : styles.checkboxUnchecked]}
            >
                {checked && <Icon name="check" size={12} color="#ffffff" />}
            </View>
        </TouchableOpacity>
    );

    const RoomButton = ({ rooms, selected, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.roomButton, selected ? styles.roomButtonSelected : styles.roomButtonUnselected]}
        >
            <Text
                style={[
                    styles.roomButtonText,
                    selected ? styles.roomButtonTextSelected : styles.roomButtonTextUnselected,
                ]}
            >
                {rooms}
            </Text>
        </TouchableOpacity>
    );

const handleSearchProperties = async () => {
        setIsLoading(true);
        console.log('Navigating to PropertyApp with filters:', {
            city: searchCity,
            location: searchLocation,
            propertyTypes: Object.keys(selectedPropertyTypes).filter(
                (key) => selectedPropertyTypes[key]
            ),
            rooms: selectedRooms,
            furnishType: Object.keys(selectedFurnishType).filter(
                (key) => selectedFurnishType[key]
            ),
            budget,
            radius,
        });

        // Simulate a loading delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);

        // Navigate to PropertyApp, passing the current filter states
        navigation.navigate('PropertyApp', {
            city: searchCity,
            location: searchLocation,
            propertyTypes: Object.keys(selectedPropertyTypes).filter(
                (key) => selectedPropertyTypes[key]
            ),
            rooms: selectedRooms,
            furnishType: Object.keys(selectedFurnishType).filter(
                (key) => selectedFurnishType[key]
            ),
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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search Filter</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Search Inputs */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInput}>
                        <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
                        <TextInput
                            placeholder="City"
                            style={styles.textInput}
                            value={searchCity}
                            onChangeText={setSearchCity}
                        />
                        <TouchableOpacity onPress={() => setSearchCity('')}>
                            <Icon name="close" size={20} color="#6b7280" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchInput}>
                        <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Location or Locality"
                            style={styles.textInput}
                            value={searchLocation}
                            onChangeText={setSearchLocation}
                        />
                        <TouchableOpacity onPress={() => setSearchLocation('')}>
                            <Icon name="close" size={20} color="#6b7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Property Type Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>I am looking for,</Text>
                    <View style={styles.propertyTypeContainer}>
                        <PropertyTypeButton
                            type="Whole property"
                            iconName="home"
                            selected={selectedPropertyType === 'whole'}
                            onPress={() => setSelectedPropertyType('whole')}
                        />
                        <PropertyTypeButton
                            type="Shared property"
                            iconName="apartment"
                            selected={selectedPropertyType === 'shared'}
                            onPress={() => setSelectedPropertyType('shared')}
                        />
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
                        minimumTrackTintColor="#009CA0"
                        maximumTrackTintColor="#e5e7eb"
                        thumbTintColor="#009CA0"
                        onValueChange={(value) => setRadius(value)}
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
                        minimumTrackTintColor="#009CA0"
                        maximumTrackTintColor="#e5e7eb"
                        thumbTintColor="#009CA0"
                        onValueChange={(value) => setBudget(value)}
                    />
                </View>

                {/* Property Type Checkboxes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Property Type</Text>
                    <CheckboxOption
                        label="Apartment"
                        checked={selectedPropertyTypes.apartment}
                        onPress={() => setSelectedPropertyTypes((prev) => ({ ...prev, apartment: !prev.apartment }))}
                        iconName="apartment"
                    />
                    <CheckboxOption
                        label="Bungalow"
                        checked={selectedPropertyTypes.bungalow}
                        onPress={() => setSelectedPropertyTypes((prev) => ({ ...prev, bungalow: !prev.bungalow }))}
                        iconName="home"
                    />
                    <CheckboxOption
                        label="Villa"
                        checked={selectedPropertyTypes.villa}
                        onPress={() => setSelectedPropertyTypes((prev) => ({ ...prev, villa: !prev.villa }))}
                        iconName="villa"
                    />
                    <CheckboxOption
                        label="Penthouse"
                        checked={selectedPropertyTypes.penthouse}
                        onPress={() => setSelectedPropertyTypes((prev) => ({ ...prev, penthouse: !prev.penthouse }))}
                        iconName="business"
                    />
                    <CheckboxOption
                        label="Studio"
                        checked={selectedPropertyTypes.studio}
                        onPress={() => setSelectedPropertyTypes((prev) => ({ ...prev, studio: !prev.studio }))}
                        iconName="home-work"
                    />
                </View>

                {/* Number of Rooms */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>No. of Rooms</Text>
                    <View style={styles.roomsContainer}>
                        {['1RK', '1BHK', '2BHK', '3BHK', '4BHK', '+4BHK'].map((room) => (
                            <RoomButton
                                key={room}
                                rooms={room}
                                selected={selectedRooms === room}
                                onPress={() => setSelectedRooms(room)}
                            />
                        ))}
                    </View>
                </View>

                {/* Furnish Type */}
                <View style={[styles.section, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>Furnish Type</Text>
                    <CheckboxOption
                        label="Unfurnished"
                        checked={selectedFurnishType.unfurnished}
                        onPress={() => setSelectedFurnishType((prev) => ({ ...prev, unfurnished: !prev.unfurnished }))}
                    />
                    <CheckboxOption
                        label="Part-Furnished"
                        checked={selectedFurnishType.partFurnished}
                        onPress={() => setSelectedFurnishType((prev) => ({ ...prev, partFurnished: !prev.partFurnished }))}
                    />
                    <CheckboxOption
                        label="Fully Furnished"
                        checked={selectedFurnishType.fullyFurnished}
                        onPress={() => setSelectedFurnishType((prev) => ({ ...prev, fullyFurnished: !prev.fullyFurnished }))}
                    />
                </View>
            </ScrollView>

            {/* Search Button */}
            <View style={styles.searchButtonContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearchProperties}
                >
                    <Text style={styles.searchButtonText}>Search Properties</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#374151',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#111827',
    },
    backButton: { marginRight: 16 },
    headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: '500' },
    scrollView: { flex: 1, paddingHorizontal: 16 },
    searchContainer: { marginTop: 16, gap: 12 },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 12,
    },
    searchIcon: { marginRight: 12 },
    textInput: { flex: 1, color: '#374151', fontSize: 16 },
    section: { marginTop: 24 },
    lastSection: { marginBottom: 24 },
    sectionTitle: { color: '#374151', fontSize: 16, marginBottom: 12,},
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
    width: '30%',              // ~3 per row
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,          // vertical gap between rows
    alignItems: 'center',
    marginHorizontal: '1.5%',  // horizontal gap between buttons
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