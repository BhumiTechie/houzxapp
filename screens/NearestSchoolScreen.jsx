import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const NearestSchoolScreen = ({ navigation }) => (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#06B6D4" />
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nearest Schools</Text>
            <View style={{ width: 24 }} />
        </View>
        <ScrollView style={styles.content}>
            <Text style={styles.listItem}>Springdale International School - 0.5 km away</Text>
            <Text style={styles.listItem}>Greenwood High School - 1 km away</Text>
            <Text style={styles.listItem}>City Public School - 1.2 km away</Text>
            <Text style={styles.listItem}>Little Angels Primary - 0.8 km away</Text>
            <Text style={styles.listItem}>St. Mary's Convent - 1.5 km away</Text>
            {/* Add more schools here */}
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

export default NearestSchoolScreen;