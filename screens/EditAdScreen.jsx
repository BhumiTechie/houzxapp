import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAd } from '../context/AdContext';


export default function EditAdScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const ad = route.params?.ad; // Ad data passed from MyAdsScreen
  const { updateAd } = useAd();


  const [title, setTitle] = useState(ad?.title || '');
  const [bhk, setBHK] = useState(ad?.bhk || '');
  const [furnishing, setFurnishing] = useState(ad?.furnishing || '');
  const [location, setLocation] = useState(ad?.location || '');
  const [rent, setRent] = useState(ad?.rent || '');
  const [availability, setAvailability] = useState(ad?.availability || '');
const handleUpdate = () => {
  const updatedAd = {
    ...ad,
    title,
    bhk,
    furnishing,
    location,
    rent,
    availability,
  };

  updateAd(ad.id, updatedAd); // 🔁 update the ad in context
  navigation.goBack();
};


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Ad</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>BHK</Text>
        <TextInput style={styles.input} value={bhk} onChangeText={setBHK} />

        <Text style={styles.label}>Furnishing</Text>
        <TextInput style={styles.input} value={furnishing} onChangeText={setFurnishing} />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Rent</Text>
        <TextInput style={styles.input} value={rent} onChangeText={setRent} keyboardType="numeric" />

        <Text style={styles.label}>Availability Date</Text>
        <TextInput style={styles.input} value={availability} onChangeText={setAvailability} />

        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateText}>Update Ad</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    padding: 20,
  },
  label: {
    marginTop: 16,
    fontSize: 14,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
  },
  updateBtn: {
    marginTop: 30,
    backgroundColor: '#007B80',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
