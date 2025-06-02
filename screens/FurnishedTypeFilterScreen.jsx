// screens/FurnishedTypeFilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const furnishedOptions = [
    { label: 'No Preference', value: 'no_preference', icon: 'minus' },
    { label: 'Unfurnished', value: 'unfurnished', icon: 'home-outline' },
    { label: 'Part-Furnished', value: 'part_furnished', icon: 'bed-empty' },
    { label: 'Fully Furnished', value: 'fully_furnished', icon: 'sofa' },
];

const FurnishedTypeFilterScreen = () => {
    const navigation = useNavigation();
    const [selectedFurnishedTypes, setSelectedFurnishedTypes] = useState(['unfurnished', 'part_furnished']); // Initialize with Unfurnished and Part-Furnished selected

    const handleBack = () => {
        navigation.goBack();
    };

    const toggleFurnishedType = (value) => {
        if (selectedFurnishedTypes.includes(value)) {
            setSelectedFurnishedTypes(selectedFurnishedTypes.filter(item => item !== value));
        } else {
            setSelectedFurnishedTypes([...selectedFurnishedTypes, value]);
        }
    };

    const applyFurnishedTypeFilters = () => {
        console.log('Selected Furnished Types:', selectedFurnishedTypes);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Furnished Type</Text>
                <TouchableOpacity onPress={applyFurnishedTypeFilters}>
                    <Text style={styles.applyButton}>Apply</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {furnishedOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={styles.row}
                        onPress={() => toggleFurnishedType(option.value)}
                    >
                        <View style={styles.labelContainer}>
                            <Icon name={option.icon} size={24} color="#333" style={styles.icon} />
                            <Text style={styles.labelText}>{option.label}</Text>
                        </View>
                        <View style={[styles.checkbox, selectedFurnishedTypes.includes(option.value) && styles.checkboxActive]}>
                            {selectedFurnishedTypes.includes(option.value) && (
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

export default FurnishedTypeFilterScreen;