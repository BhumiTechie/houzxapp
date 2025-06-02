// screens/NoOfRoomsFilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const roomsOptions = [
    { label: '1RK', value: '1rk' },
    { label: '2BHK', value: '2bhk' },
    { label: '3BHK', value: '3bhk' },
    { label: '4BHK', value: '4bhk' },
    { label: '+4BHK', value: 'plus_4bhk' },
];

const NoOfRoomsFilterScreen = () => {
    const navigation = useNavigation();
    const [selectedRooms, setSelectedRooms] = useState(['1rk', '2bhk']); // Initialize with 1RK and 2BHK selected

    const handleBack = () => {
        navigation.goBack();
    };

    const toggleRoom = (value) => {
        if (selectedRooms.includes(value)) {
            setSelectedRooms(selectedRooms.filter(item => item !== value));
        } else {
            setSelectedRooms([...selectedRooms, value]);
        }
    };

    const applyRoomFilters = () => {
        console.log('Selected No. of Rooms:', selectedRooms);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>No. of Rooms</Text>
                <TouchableOpacity onPress={applyRoomFilters}>
                    {/* <Text style={styles.applyButton}>Apply</Text> */}
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {roomsOptions.map((room) => (
                    <TouchableOpacity
                        key={room.value}
                        style={styles.row}
                        onPress={() => toggleRoom(room.value)}
                    >
                        <Text style={styles.labelText}>{room.label}</Text>
                        <View style={[styles.checkbox, selectedRooms.includes(room.value) && styles.checkboxActive]}>
                            {selectedRooms.includes(room.value) && (
                                <Icon name="check" size={20} color="#fff" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
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
        backgroundColor: '#000', // Assuming the same teal color
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    applyButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    labelText: {
        fontSize: 16,
        color: '#333',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxActive: {
        backgroundColor: '#038488', // Teal color for selected checkbox
        // borderColor: '#00bcd4',
    },
});

export default NoOfRoomsFilterScreen;