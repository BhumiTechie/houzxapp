import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RentConfirmationScreen = ({ rentDetails }) => {
    const { rentAmount, billingPeriod, billsIncluded, noDeposit } = rentDetails;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rent Details</Text>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Rent:</Text>
                <Text style={styles.value}>₹ {rentAmount}</Text>
            </View>

            <View style={styles.detailItem}>
                <Text style={styles.label}>Billing Period:</Text>
                <Text style={styles.value}>{billingPeriod}</Text>
            </View>

            {billsIncluded && (
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Bills Included:</Text>
                    <Text style={styles.value}>Yes</Text>
                </View>
            )}

            {noDeposit && (
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Deposit:</Text>
                    <Text style={styles.value}>No Deposit</Text>
                </View>
            )}

            {/* You might have a button here to proceed with booking */}
            {/* <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    bookButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default RentConfirmationScreen;