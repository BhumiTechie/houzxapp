import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const NearestStationScreen = ({ navigation }) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#06B6D4" />
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nearest Stations</Text>
            <View style={{ width: 24 }} /> {/* To balance layout */}
        </View>
        <ScrollView style={styles.content}>
            <Text style={styles.listItem}>Mumbai Central - 1 km away</Text>
            <Text style={styles.listItem}>Dadar - 1.5 km away</Text>
            <Text style={styles.listItem}>Bandra Terminus - 2 km away</Text>
            <Text style={styles.listItem}>Churchgate - 2.5 km away</Text>
            <Text style={styles.listItem}>Andheri - 3 km away</Text>
            {/* Add more stations here */}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        padding: 16
    },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    content: { flex: 1, padding: 16 },
    listItem: { fontSize: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', color: '#111827' },
});

export default NearestStationScreen;