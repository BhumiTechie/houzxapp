import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import SortByModal from './SortByModal';
import sortIcon from '../assets/sort.png';
import filterIcon from '../assets/filter.png';
import mapIcon from '../assets/map.png';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
// import Geolocation from 'react-native-geolocation-service'; // Uncomment when using Geolocation

const PropertyApp = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const filters = route.params || {};
    const [isSortModalVisible, setIsSortModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState('Default');
    const [propertyListings, setPropertyListings] = useState([]);
    const [error, setError] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    const dummyData = [
        {
            id: 1,
            name: 'Luxury Apartment',
            bhk: '2BHK',
            area: '1200 sq.ft',
            furnished: 'Part-Furnished',
            location: 'Gangapur Road, Nashik, Maharashtra',
            rent: '₹12,000',
            availability: '16th October',
            image: 'https://images.unsplash.com/photo-1568605114967-8df9293715c2?w=300&h=200&fit=crop',
            contact: 'FREE TO CONTACT',
            isFavorite: false,
            propertyTypes: ['apartment'],
            furnishType: ['partFurnished'],
            rooms: '2BHK',
            price: 12000,
            lastUpdated: new Date('2025-05-30T10:00:00Z'),
            createdAt: new Date('2025-05-25T10:00:00Z'),
        },
        {
            id: 2,
            name: 'Spacious Villa',
            bhk: '4BHK',
            area: '2500 sq.ft',
            furnished: 'Fully Furnished',
            location: 'Indore, Madhya Pradesh',
            rent: '₹35,000',
            availability: 'Available Now',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6ed1516c?w=300&h=200&fit=crop',
            contact: 'UPGRADE TO CONTACT',
            isFavorite: false,
            propertyTypes: ['villa'],
            furnishType: ['fullyFurnished'],
            rooms: '4BHK',
            price: 35000,
            lastUpdated: new Date('2025-05-31T09:00:00Z'),
            createdAt: new Date('2025-05-20T10:00:00Z'),
        },
        {
            id: 3,
            name: 'Cozy Studio',
            bhk: '1RK',
            area: '400 sq.ft',
            furnished: 'Unfurnished',
            location: 'Bhopal, Madhya Pradesh',
            rent: '₹7,000',
            availability: 'Next Month',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop',
            contact: 'FREE TO CONTACT',
            isFavorite: false,
            propertyTypes: ['studio'],
            furnishType: ['unfurnished'],
            rooms: '1RK',
            price: 7000,
            lastUpdated: new Date('2025-05-28T12:00:00Z'),
            createdAt: new Date('2025-05-15T10:00:00Z'),
        },
        {
            id: 4,
            name: 'Modern Penthouse',
            bhk: '3BHK',
            area: '1800 sq.ft',
            furnished: 'Fully Furnished',
            location: 'Mumbai, Maharashtra',
            rent: '₹50,000',
            availability: 'Available Now',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop',
            contact: 'FREE TO CONTACT',
            isFavorite: false,
            propertyTypes: ['penthouse'],
            furnishType: ['fullyFurnished'],
            rooms: '3BHK',
            price: 50000,
            lastUpdated: new Date('2025-05-29T15:00:00Z'),
            createdAt: new Date('2025-05-22T10:00:00Z'),
        },
        {
            id: 5,
            name: 'Compact Apartment',
            bhk: '1BHK',
            area: '600 sq.ft',
            furnished: 'Part-Furnished',
            location: 'Bhopal, Madhya Pradesh',
            rent: '₹9,000',
            availability: '1 Week',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop',
            contact: 'UPGRADE TO CONTACT',
            isFavorite: false,
            propertyTypes: ['apartment'],
            furnishType: ['partFurnished'],
            rooms: '1BHK',
            price: 9000,
            lastUpdated: new Date('2025-05-31T11:00:00Z'),
            createdAt: new Date('2025-05-27T10:00:00Z'),
        },
    ];

    useEffect(() => {
        // Dynamically set header title
        navigation.setOptions({
            title: filters.location || 'Properties',
        });

        setError(null);
        setPropertyListings(dummyData);

        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This app needs to access your location.',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Location permission granted.');
                        // fetchLocation();
                    } else {
                        console.log('Location permission denied.');
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                // fetchLocation();
            }
        };

        requestLocationPermission();
    }, [filters.location]);

    const openSortModal = () => setIsSortModalVisible(true);
    const closeSortModal = () => setIsSortModalVisible(false);
    const handleSort = (option) => {
        setSortBy(option);
        setIsSortModalVisible(false);
    };
    const handlePropertyPress = (item) => {
        navigation.navigate('PropertyDetailsScreen', { property: item });
    };
    const goToFilters = () => navigation.navigate('FilterScreen');

    const PropertyCard = ({ item }) => (
        <TouchableOpacity onPress={() => handlePropertyPress(item)} style={styles.propertyCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.propertyImage} />
                {item.contact && (
                    <View style={styles.contactBadge}>
                        <Text style={styles.contactText}>{item.contact}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.favoriteButton}>
                    <Icon
                        name={item.isFavorite ? "favorite" : "favorite-border"}
                        size={20}
                        color={item.isFavorite ? "#ff4757" : "#ffffff"}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.propertyName}>{item.name}</Text>
                <View style={styles.specsRow}>
                    <Icon name="bed" size={16} color="#777" style={styles.icon} />
                    <Text style={styles.specText}>{item.bhk}</Text>
                    <Icon name="aspect-ratio" size={16} color="#777" style={styles.icon} />
                    <Text style={styles.specText}>{item.area}</Text>
                    <Icon name="chair" size={16} color="#777" style={styles.icon} />
                    <Text style={styles.specText}>{item.furnished}</Text>
                </View>
                <View style={styles.locationRow}>
                    <Icon name="location-on" size={16} color="#777" style={styles.icon} />
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View style={styles.rentAvailabilityRow}>
                    <View style={styles.rentContainer}>
                        <Text style={styles.rentAmount}>{item.rent}</Text>
                        <Text style={styles.rentPeriod}>Per Month</Text>
                    </View>
                    <Text style={styles.availabilityText}>Available {item.availability}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (error) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>Error loading properties: {error}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.errorBackButton}>
                    <Text style={styles.errorBackButtonText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
            <View style={styles.headerActions}>
  <TouchableOpacity style={styles.actionButton} onPress={openSortModal}>
    <Image source={sortIcon} style={styles.iconImage} />
    <Text style={styles.actionText}>Sort</Text>
  </TouchableOpacity>

  <View style={styles.separator} />

  <TouchableOpacity style={styles.actionButton} onPress={goToFilters}>
    <Image source={filterIcon} style={styles.iconImage} />
    <Text style={styles.actionText}>Filter</Text>
  </TouchableOpacity>

  <View style={styles.separator} />

  <TouchableOpacity style={styles.actionButton}>
    <Image source={mapIcon} style={styles.iconImage} />
    <Text style={styles.actionText}>Map</Text>
  </TouchableOpacity>
</View>

            </View>

            <FlatList
                data={propertyListings}
                renderItem={({ item }) => <PropertyCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            <SortByModal
                isVisible={isSortModalVisible}
                onClose={closeSortModal}
                onSort={handleSort}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    locationInfo: {
        padding: 10,
        backgroundColor: '#e0f7fa',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b2ebf2',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        justifyContent: 'space-between',
    },
headerActions: {
  flexDirection: 'row', // 👈 Add this
  justifyContent: 'space-around', // 👈 Optional for even spacing
  alignItems: 'center',
  width: width * 0.95,
  height: height * 0.07,
//   marginTop: height * 0.13,
  paddingHorizontal: width * 0.03,
  backgroundColor: '#fff',
},



    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    actionText: {
        marginLeft: 4,
        color: '#000',
        fontSize: 12,
    },
    iconImage: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
},

    separator: {
        width: 1,
        height: 20,
        backgroundColor: '#ccc',
        marginHorizontal: 8,
    },
    listContainer: {
        padding: 16,
    },
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
    },
    propertyImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    contactBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#14b8a6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    contactText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        padding: 16,
    },
    propertyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    specsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    icon: {
        marginRight: 4,
    },
    specText: {
        fontSize: 14,
        color: '#777',
        marginRight: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    rentAvailabilityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        // borderTopWidth:
        borderTopColor: '#eee',
        marginTop: 10,
    },
    rentContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    rentAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 4,
    },
    rentPeriod: {
        fontSize: 12,
        color: '#777',
    },
    availabilityText: {
        fontSize: 14,
        color: '#14b8a6',
        fontWeight: 'bold',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noResultsText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    errorBackButton: {
        backgroundColor: '#14b8a6',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    errorBackButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PropertyApp;