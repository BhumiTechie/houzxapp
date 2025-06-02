// screens/FilterScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons

const FilterScreen = () => {
    const navigation = useNavigation();

    const navigateToRentFilter = () => {
        navigation.navigate('RentFilterScreen');
    };

    const navigateToAvailabilityFilter = () => {
        console.log('Navigating to Availability Filter');
        navigation.navigate('AvailabilityFilterScreen'); // You'll need to create this screen
    };

    const navigateToPropertyTypeFilter = () => {
        console.log('Navigating to Property Type Filter');
        navigation.navigate('PropertyTypeFilterScreen'); // You'll need to create this screen
    };

    const navigateToNoOfRoomsFilter = () => {
        console.log('Navigating to No. of Rooms Filter');
        navigation.navigate('NoOfRoomsFilterScreen'); // You'll need to create this screen
    };

    const navigateToFurnishedTypeFilter = () => {
        console.log('Navigating to Furnished Type Filter');
        navigation.navigate('FurnishedTypeFilterScreen'); // You'll need to create this screen
    };

    const navigateToAmenitiesFilter = () => {
        console.log('Navigating to Amenities Filter');
        navigation.navigate('AmenitiesFilterScreen'); // You'll need to create this screen
    };

    const navigateToSuitableForFilter = () => {
        console.log('Navigating to Suitable For Filter');
        navigation.navigate('SuitableForFilterScreen'); // You'll need to create this screen
    };

    const handleClose = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <Icon name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filters</Text>
                <View style={{ width: 24 }} /> {/* Spacer for alignment */}
            </View>

            <ScrollView style={styles.filtersContainer}>
                <TouchableOpacity style={styles.filterRow} onPress={navigateToRentFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="currency-inr" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>Rent</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterRow} onPress={navigateToAvailabilityFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="calendar-blank-outline" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>Availability</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterRow} onPress={navigateToPropertyTypeFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="home-variant-outline" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>Property Type</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterRow} onPress={navigateToNoOfRoomsFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="door-closed-outline" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>No. of Rooms</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterRow} onPress={navigateToFurnishedTypeFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="sofa-outline" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>Furnished Type</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterRow} onPress={navigateToAmenitiesFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="star-outline" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>Amenities</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterRow} onPress={navigateToSuitableForFilter}>
                    <View style={styles.filterLabelContainer}>
                        <Icon name="account-group-outline" size={24} color="#333" style={styles.filterIcon} />
                        <Text style={styles.filterLabel}>Suitable For</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color="#777" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Black background for the screen
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        justifyContent: 'space-between',
        backgroundColor: '#000', // Black background for the header
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff', // White text for the title
    },
    filtersContainer: {
        flex: 1,
        backgroundColor: '#fff', // White background for the filter list
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterIcon: {
        marginRight: 16,
    },
    filterLabel: {
        fontSize: 16,
        color: '#333',
    },
    filterRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // Removed filterAppliedIndicator style
});

export default FilterScreen; 