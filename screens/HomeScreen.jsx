import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');

  const featuredProperties = [
    {
      id: '1',
      title: 'Property Name',
      subtitle: '2BHK · Part Furnished',
      location: 'Gangapur Rd, Nashik, Maharashtra',
      price: '₹1.2Cr',
      area: '1200 sqft.',
    },
    {
      id: '2',
      title: 'Property Name',
      subtitle: '2BHK',
      location: 'Gangapur Rd, Nashik',
      price: '₹1.2Cr',
      area: '1200 sqft.',
    },
    {
      id: '3',
      title: 'Property Name',
      subtitle: '3BHK · Semi Furnished',
      location: 'Nashik, Maharashtra',
      price: '₹1.5Cr',
      area: '1400 sqft.',
    },
    {
      id: '4',
      title: 'Property Name',
      subtitle: '1BHK',
      location: 'Nashik, Maharashtra',
      price: '₹75L',
      area: '800 sqft.',
    },
  ];

  const iconMap = {
    Home: require('../assets/home.png'),
    Messages: require('../assets/message.png'),
    Saved: require('../assets/saved.png'),
    Account: require('../assets/account.png'),
    'Post Ad': require('../assets/postad.png'),
  };

  const renderCard = ({ item }) => (
    <View style={styles.propertyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.propertyImage} />
        <AntDesign name="hearto" size={20} color="#05141A" style={styles.heartIcon} />
      </View>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertySub}>{item.subtitle}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Ionicons name="location-outline" size={14} color="#666" style={{ marginRight: 4 }} />
        <Text style={styles.propertyLocation}>{item.location}</Text>
      </View>
      <View style={styles.propertyDetailsRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.area}>{item.area}</Text>
      </View>
    </View>
  );

  const renderNavItem = (label) => {
    const isActive = activeTab === label;
    return (
      <TouchableOpacity
        key={label}
        style={styles.navItem}
        onPress={() => setActiveTab(label)}
      >
        <Image
          source={iconMap[label]}
          style={[
            styles.navIcon,
            { tintColor: isActive ? '#009CA0' : '#666' },
          ]}
          resizeMode="contain"
        />
        <Text style={[styles.navText, { color: isActive ? '#009CA0' : '#666' }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logohouzx.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.searchBox} onPress={() => navigation.navigate('SearchScreen')}>
            <Image source={require('../assets/card1.png')} style={styles.bannerImg} resizeMode="cover" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyBox}>
            <Text style={styles.buyText}>BUY A PROPERTY</Text>
            <Ionicons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>AI Property Finder</Text>

        <View style={styles.comingCardContainer}>
          <Image source={require('../assets/coming.png')} style={styles.comingCard} resizeMode="contain" />
        </View>

        <Text style={styles.featuredTitle}>Featured Properties</Text>
        <FlatList
          data={featuredProperties}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredListContent}
        />
      </ScrollView>

      <View style={styles.bottomNavigation}>
        {['Home', 'Messages', 'Saved', 'Account', 'Post Ad'].map(renderNavItem)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#05141A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  section: {
    marginTop: 24,
    gap: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  searchBox: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  buyBox: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#9A4C04D9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
    color: '#05141A',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  featuredListContent: {
    paddingHorizontal: 8,
  },
  propertyCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
  },
  cardHeader: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    opacity: 0.8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  propertySub: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  propertyDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  area: {
    color: '#888',
    fontSize: 14,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  navIcon: {
    width: 26,
    height: 26,
    marginBottom: 2,
  },
  comingCardContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  comingCard: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
});
