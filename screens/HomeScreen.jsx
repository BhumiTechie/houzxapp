import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({navigation}) {
  const featuredProperties = [
    {
      id: '1',
      title: 'Property Name',
      subtitle: '2BHK · Part Furnished',
      location: 'Gangapur Rd, Nashik, Maharashtra',
      price: '₹1.2Cr',
      area: '1200 sqft.',
      // image: require('./assets/house1.jpg'),
    },
    {
      id: '2',
      title: 'Property Name',
      subtitle: '2BHK',
      location: 'Gangapur Rd, Nashik',
      price: '₹1.2Cr',
      area: '1200 sqft.',
      // image: require('./assets/house2.jpg'),
    },
    {
      id: '3',
      title: 'Property Name',
      subtitle: '3BHK · Semi Furnished',
      location: 'Nashik, Maharashtra',
      price: '₹1.5Cr',
      area: '1400 sqft.',
      // image: require('./assets/house3.jpg'),
    },
    {
      id: '4',
      title: 'Property Name',
      subtitle: '1BHK',
      location: 'Nashik, Maharashtra',
      price: '₹75L',
      area: '800 sqft.',
      // image: require('./assets/house4.jpg'),
    },
  ];

  const renderCard = ({ item }) => (
    <View style={styles.propertyCard}>
      <View style={styles.cardHeader}>
        <Image source={item.image} style={styles.propertyImage} />
        <AntDesign name="hearto" size={20} color="#05141A" style={styles.heartIcon} />
      </View>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertySub}>{item.subtitle}</Text>
      <Text style={styles.propertyLocation}>
        <Ionicons name="location-outline" size={14} color="#666" /> {item.location}
      </Text>
      <View style={styles.propertyDetailsRow}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.area}>{item.area}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
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

        <Text style={styles.sectionTitle}>AI Property Finder</Text>   {/* <<< Yeh ab bahar aaya */}

<View style={styles.aiSection}>
  <View style={styles.aiContent}>
    <View style={styles.aiTextContainer}>
      <Text style={styles.aiSubTitle}>Chat with our AI Property Finder</Text>
      <Text style={styles.aiSub}>Search for rental properties & new properties to buy.</Text>
      <Text style={styles.comingSoon}>Coming Soon</Text>
    </View>
    <Image source={require('../assets/robot.png')} style={styles.aiImage} resizeMode="contain" />
  </View>
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
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#05141A" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#666" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={30} color="#666" />
          <Text style={styles.navText}>Post Ad</Text>
        </TouchableOpacity>
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
    overflow: 'hidden',
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
    backgroundColor: '#A14B00',
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
  
  aiSection: {
    backgroundColor: '#05141A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 16,  
  },
  aiTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  aiSubTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aiSub: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 8,
  },
  comingSoon: {
    color: '#00D8C0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aiImage: {
    width: 80,
    height: 80,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,   // ===> Title align hoga
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
});
