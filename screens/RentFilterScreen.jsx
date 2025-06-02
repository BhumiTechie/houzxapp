// screens/RentFilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RentFilterScreen = () => {
    const navigation = useNavigation();
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [billingPeriod, setBillingPeriod] = useState(null); // State for selected billing period
    const [billsIncluded, setBillsIncluded] = useState(false);
    const [noDeposit, setNoDeposit] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleBillingPeriodPress = () => {
        console.log('Navigate to Billing Period selection');
        navigation.navigate('BillingPeriodScreen', { onSelect: setBillingPeriod });
    };

    const applyRentFilters = () => {
        const rentFilters = {
            minBudget: minRent ? parseInt(minRent, 10) : undefined,
            maxBudget: maxRent ? parseInt(maxRent, 10) : undefined,
            billingPeriod: billingPeriod || undefined,
            billsIncluded: billsIncluded || undefined,
            noDeposit: noDeposit || undefined,
        };
        console.log('Applying Rent Filters:', rentFilters);
        // You would likely pass these filters back to the main FilterScreen or directly to PropertyApp
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rent</Text>
                <View style={{ width: 24 }} /> {/* Spacer */}
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.rentInputsContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Minimum</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="0.0"
                                value={minRent}
                                onChangeText={setMinRent}
                            />
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Maximum</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="0.0"
                                value={maxRent}
                                onChangeText={setMaxRent}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.optionRow} onPress={handleBillingPeriodPress}>
                    <Text style={styles.label}>Billing Period</Text>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>{billingPeriod || 'Select here'}</Text>
                        <Icon name="chevron-right" size={20} color="#777" />
                    </View>
                </TouchableOpacity>

                <View style={styles.checkboxRow}>
                    <TouchableOpacity style={styles.checkboxTouchable} onPress={() => setBillsIncluded(!billsIncluded)}>
                        <View style={[styles.checkbox, billsIncluded && styles.checkboxActive]} />
                        <Text style={styles.checkboxLabel}>Bills Included</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxRow}>
                    <TouchableOpacity style={styles.checkboxTouchable} onPress={() => setNoDeposit(!noDeposit)}>
                        <View style={[styles.checkbox, noDeposit && styles.checkboxActive]} />
                        <Text style={styles.checkboxLabel}>No Deposit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    content: {
        padding: 16,
    },
    rentInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputGroup: {
        flex: 0.48, // Adjust width for spacing
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    currencySymbol: {
        fontSize: 16,
        color: '#777',
        marginRight: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    optionRow: {
        marginBottom: 20,
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    selectText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkboxTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Default checkbox background
    },
    checkboxActive: {
        backgroundColor: '#007AFF',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
    },
});

export default RentFilterScreen;