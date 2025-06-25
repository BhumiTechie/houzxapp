import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAd } from '../context/AdContext';

const { width } = Dimensions.get('window');
const baseWidth = 414;
const scale = width / baseWidth;
const responsiveSize = (size) => Math.round(size * scale);

export default function MyAdsScreen() {
  const navigation = useNavigation();
  const { ads, removeAd } = useAd();

  const handleRemoveAd = (id) => {
    Alert.alert(
      'Remove Ad',
      'Are you sure you want to remove this ad?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            removeAd(id); // remove from context
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Ads</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Loop over ads */}
      {ads.map((ad) => (
        <View style={styles.card} key={ad.id}>
          <View style={styles.imageWrapper}>
            <Image
              source={
                ad.image
                  ? { uri: ad.image }    : null
              }
              style={styles.image}
            />
            <View style={styles.imageTopLeftBadge}>
              <Text style={styles.badgeText}>1/12</Text>
            </View>
            <View style={styles.imageTopRightBadge}>
              <Text style={styles.badgeText}>FREE TO CONTACT</Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.title}>{ad.title}</Text>

            <View style={styles.row}>
              <Feather name="home" size={16} color="#444" />
              <Text style={styles.text}>{ad.bhk}</Text>
              <Feather name="grid" size={16} color="#444" style={{ marginLeft: 16 }} />
              <Text style={styles.text}>{ad.furnishing}</Text>
            </View>

            <View style={[styles.row, { marginTop: 6 }]}>
              <Feather name="map-pin" size={16} color="#444" />
              <Text style={styles.text}>{ad.location}</Text>
            </View>

            <View style={[styles.rowBetween, { marginTop: 12 }]}>
              <View>
                <Text style={styles.rentLabel}>Rent</Text>
                <Text style={styles.rentAmount}>
                  {ad.rent} <Text style={styles.perMonth}>Per Month</Text>
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.rentLabel}>Available</Text>
                <Text style={styles.availability}>{ad.availability}</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('EditAd', { ad })}
              >
                <Feather name="edit-2" size={16} color="#007B80" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleRemoveAd(ad.id)}
              >
                <Feather name="trash-2" size={16} color="#007B80" />
                <Text style={styles.actionText}>Remove Ad</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#05141A',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageTopLeftBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  imageTopRightBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007B80',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    marginLeft: 4,
    color: '#444',
  },
  rentLabel: {
    color: '#999',
    fontSize: 12,
  },
  rentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  perMonth: {
    fontSize: 14,
    fontWeight: '400',
  },
  availability: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    color: '#007B80',
    fontWeight: '500',
  },
});
