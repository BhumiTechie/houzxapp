// screens/BillingPeriodScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BillingPeriodScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { onSelect } = route.params || {};

    const billingOptions = [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Yearly', value: 'yearly' },
        { label: 'Weekly', value: 'weekly' }, // Added weekly as discussed earlier
    ];

    const handleOptionPress = (item) => {
        if (onSelect) {
            onSelect(item.value);
        }
        navigation.goBack();
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress(item)}>
            <Text style={styles.optionText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Billing Period</Text>
                <View style={{ width: 24 }} /> {/* Spacer */}
            </View>
            <FlatList
                data={billingOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
            />
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
        backgroundColor: '#000',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default BillingPeriodScreen;