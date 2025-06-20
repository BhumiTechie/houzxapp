import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BuyScreen = () => {
  const [properties] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop',
      title: 'Apartment Name',
      bhk: '3BHK',
      furnished: 'Part Furnished',
      location: 'Gangapur Road, Nashik, Maharashtra',
      price: '₹30,00,000',
      discount: '10% Discount',
      tag: 'READY TO CONTACT',
      favorite: false,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
      title: 'Apartment Name',
      bhk: '2BHK',
      furnished: 'Part Furnished',
      location: 'Gangapur Road, Nashik, Maharashtra',
      price: '₹50,00,000',
      discount: '10% Discount',
      tag: 'PURCHASE TO CONTACT',
      favorite: false,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop',
      title: 'Apartment Name',
      bhk: '3BHK',
      furnished: 'Part Furnished',
      location: 'Gangapur Road, Nashik, Maharashtra',
      price: '₹60,00,000',
      discount: '10% Discount',
      tag: 'READY TO CONTACT',
      favorite: false,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=250&fit=crop',
      title: 'Apartment Name',
      bhk: '3BHK',
      furnished: 'Part Furnished',
      location: 'Gangapur Road, Nashik, Maharashtra',
      price: '₹80,00,000',
      discount: '10% Discount',
      tag: 'READY TO CONTACT',
      favorite: false,
    },
  ]);

  const PropertyCard = ({ property }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.propertyImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="favorite-border" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{property.tag}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.propertyTitle}>{property.title}</Text>
        
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Icon name="home" size={16} color="#666" />
            <Text style={styles.detailText}>{property.bhk}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="chair" size={16} color="#666" />
            <Text style={styles.detailText}>{property.furnished}</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.locationText}>{property.location}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{property.price}</Text>
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>{property.discount}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gangapur Road, Nashik...</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="sort" size={24} color="#666" />
            <Text style={styles.headerButtonText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="filter-list" size={24} color="#666" />
            <Text style={styles.headerButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="map" size={24} color="#666" />
            <Text style={styles.headerButtonText}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Property List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  headerButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  propertyDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  discountContainer: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default BuyScreen;