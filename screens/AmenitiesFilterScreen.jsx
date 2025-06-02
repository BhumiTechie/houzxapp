// screens/AmenitiesFilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const amenitiesData = [
    { label: 'Gym', value: 'gym', icon: 'dumbbell' },
    { label: 'Garden', value: 'garden', icon: 'flower' },
    { label: 'Terrace', value: 'terrace', icon: 'roofing' },
    { label: 'Balcony', value: 'balcony', icon: 'balcony' },
    { label: 'Lift', value: 'lift', icon: 'elevator' },
    { label: 'Kids Area', value: 'kids_area', icon: 'emoticon-happy-outline' },
    { label: '2 Wheeler Parking', value: 'two_wheeler_parking', icon: 'motorbike' },
    { label: '4 Wheeler Parking', value: 'four_wheeler_parking', icon: 'car' },
    // Add more amenities as needed
];

const AmenitiesFilterScreen = () => {
    const navigation = useNavigation();
    const [selectedAmenities, setSelectedAmenities] = useState([
        'gym',
        'garden',
        'terrace',
        'balcony',
        'lift',
        'kids_area',
        'four_wheeler_parking',
    ]);

    const handleBack = () => {
        navigation.goBack();
    };

    const toggleAmenity = (value) => {
        if (selectedAmenities.includes(value)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== value));
        } else {
            setSelectedAmenities([...selectedAmenities, value]);
        }
    };

    const applyAmenityFilters = () => {
        console.log('Selected Amenities:', selectedAmenities);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Amenities</Text>
                <TouchableOpacity onPress={applyAmenityFilters}>
                    <Text style={styles.applyButton}>Apply</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {amenitiesData.map((amenity) => (
                    <TouchableOpacity
                        key={amenity.value}
                        style={styles.row}
                        onPress={() => toggleAmenity(amenity.value)}
                    >
                        <View style={styles.labelContainer}>
                            <Icon name={amenity.icon} size={24} color="#333" style={styles.icon} />
                            <Text style={styles.labelText}>{amenity.label}</Text>
                        </View>
                        <View style={[styles.checkbox, selectedAmenities.includes(amenity.value) && styles.checkboxActive]}>
                            {selectedAmenities.includes(amenity.value) && (
                                <Icon name="check" size={20} color="#fff" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        backgroundColor: '#000', // Assuming black header
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    applyButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 16,
    },
    labelText: {
        fontSize: 16,
        color: '#333',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: '#00bcd4', // Teal color for selected checkbox
        borderColor: '#00bcd4',
    },
});

export default AmenitiesFilterScreen;