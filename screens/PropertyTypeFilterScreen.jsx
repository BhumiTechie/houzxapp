// screens/PropertyTypeFilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const propertyTypesData = [
    { label: 'Apartment', value: 'apartment', icon: 'office-building' },      // Apartment building
    { label: 'Bungalow', value: 'bungalow', icon: 'home-variant' },         // House with a bit more detail
    { label: 'Villa', value: 'villa', icon: 'home-city-outline' },       // House in a city context
    { label: 'Penthouse', value: 'penthouse', icon: 'office-building-cog' }, // Tall building with a cog (could imply luxury/top floor)
    { label: 'Studio', value: 'studio', icon: 'home' },                   // Basic house icon
];

const PropertyTypeFilterScreen = () => {
    const navigation = useNavigation();
    const [selectedTypes, setSelectedTypes] = useState([]);

    const handleBack = () => {
        navigation.goBack();
    };

    const togglePropertyType = (value) => {
        if (selectedTypes.includes(value)) {
            setSelectedTypes(selectedTypes.filter(item => item !== value));
        } else {
            setSelectedTypes([...selectedTypes, value]);
        }
    };

    const applyPropertyTypeFilters = () => {
        console.log('Selected Property Types:', selectedTypes);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Property Type</Text>
                <TouchableOpacity onPress={applyPropertyTypeFilters}>
                    {/* <Text style={styles.applyButton}>Apply</Text> */}
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {propertyTypesData.map((type) => (
                    <TouchableOpacity
                        key={type.value}
                        style={styles.row}
                        onPress={() => togglePropertyType(type.value)}
                    >
                        <View style={styles.labelContainer}>
                            <Icon name={type.icon} size={24} color="#333" style={styles.icon} />
                            <Text style={styles.labelText}>{type.label}</Text>
                        </View>
                        <View style={[styles.checkbox, selectedTypes.includes(type.value) && styles.checkboxActive]}>
                            {selectedTypes.includes(type.value) && (
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
        backgroundColor: '#000', // Black background for the header
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
        backgroundColor: '#038488', // Teal color for selected checkbox
        borderColor: '#00bcd4',
    },
});

export default PropertyTypeFilterScreen;