// screens/AvailabilityFilterScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const stayOptions = [
    { label: 'None', value: 'none' },
    { label: '1 Month', value: '1' },
    { label: '2 Month', value: '2' },
    { label: '3 Month', value: '3' },
    { label: '4 Month', value: '4' },
    { label: '5 Month', value: '5' },
    { label: '6 Month', value: '6' },
    { label: '7 Month', value: '7' },
    { label: '8 Month', value: '8' },
    { label: '9 Month', value: '9' },
    { label: '10 Month', value: '10' },
    { label: '11 Month', value: '11' },
    { label: '12 Month', value: '12' },
];

const AvailabilityFilterScreen = () => {
    const navigation = useNavigation();
    const [moveInDate, setMoveInDate] = useState(null);
    const [minimumStay, setMinimumStay] = useState(null);
    const [maximumStay, setMaximumStay] = useState(null);
    const [isMinimumStayVisible, setIsMinimumStayVisible] = useState(false);
    const [isMaximumStayVisible, setIsMaximumStayVisible] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleMoveInDatePress = () => {
        setIsDatePickerVisible(true);
    };

    const handleMinimumStayPress = () => {
        setIsMinimumStayVisible(true);
    };

    const handleMaximumStayPress = () => {
        setIsMaximumStayVisible(true);
    };

    const setDate = (event, selectedDate) => {
        const currentDate = selectedDate || moveInDate;
        setIsDatePickerVisible(Platform.OS === 'ios'); // Hide picker on iOS after selection
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString(); // Customize format if needed
            setMoveInDate(formattedDate);
        }
    };

    const selectMinimumStay = (item) => {
        setMinimumStay(item.label);
        setIsMinimumStayVisible(false);
    };

    const selectMaximumStay = (item) => {
        setMaximumStay(item.label);
        setIsMaximumStayVisible(false);
    };

    const applyAvailabilityFilters = () => {
        const availabilityFilters = {
            moveInDate: moveInDate,
            minimumStay: minimumStay,
            maximumStay: maximumStay,
        };
        console.log('Applying Availability Filters:', availabilityFilters);
        navigation.goBack();
        // Or navigate back to FilterScreen and pass the filters
    };

    const renderStayOptionItem = ({ item }) => (
        <TouchableOpacity style={styles.modalOptionItem} onPress={() => {
            if (isMinimumStayVisible) {
                selectMinimumStay(item);
            } else if (isMaximumStayVisible) {
                selectMaximumStay(item);
            }
        }}>
            <Text style={styles.modalOptionText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Availability</Text>
                <TouchableOpacity onPress={applyAvailabilityFilters}>
                    <Text style={styles.applyButton}>Apply</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <TouchableOpacity style={styles.optionRow} onPress={handleMoveInDatePress}>
                    <Text style={styles.label}>Move In Date</Text>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>{moveInDate || 'Select here'}</Text>
                        <Icon name="calendar-outline" size={24} color="#777" />
                    </View>
                </TouchableOpacity>

                {isDatePickerVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={moveInDate ? new Date(moveInDate) : new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={setDate}
                    />
                )}

                <TouchableOpacity style={styles.optionRow} onPress={handleMinimumStayPress}>
                    <Text style={styles.label}>Minimum Stay</Text>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>{minimumStay || 'Select here'}</Text>
                        <Icon name="chevron-right" size={20} color="#777" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionRow} onPress={handleMaximumStayPress}>
                    <Text style={styles.label}>Maximum Stay</Text>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectText}>{maximumStay || 'Select here'}</Text>
                        <Icon name="chevron-right" size={20} color="#777" />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={isMinimumStayVisible || isMaximumStayVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    setIsMinimumStayVisible(false);
                    setIsMaximumStayVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{isMinimumStayVisible ? 'Select Minimum Stay' : 'Select Maximum Stay'}</Text>
                        <FlatList
                            data={stayOptions}
                            renderItem={renderStayOptionItem}
                            keyExtractor={(item) => item.value}
                        />
                        <TouchableOpacity style={styles.modalCloseButton} onPress={() => {
                            setIsMinimumStayVisible(false);
                            setIsMaximumStayVisible(false);
                        }}>
                            <Text style={styles.modalCloseText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    applyButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    optionRow: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    modalOptionItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#333',
    },
    modalCloseButton: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default AvailabilityFilterScreen;