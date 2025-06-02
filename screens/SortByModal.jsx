// components/SortByModal.jsx
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SortByModal = ({ isVisible, onClose, onSort }) => {
    const [selectedOption, setSelectedOption] = useState('Default'); // Default sorting

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSort(option); // Callback to the parent screen with the selected option
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Sort By</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color="#555" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.optionRow} onPress={() => handleSelect('Default')}>
                        <Text style={styles.optionText}>Default</Text>
                        <Icon name={selectedOption === 'Default' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#00bcd4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow} onPress={() => handleSelect('Last Updated')}>
                        <Text style={styles.optionText}>Last Updated</Text>
                        <Icon name={selectedOption === 'Last Updated' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#00bcd4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow} onPress={() => handleSelect('Newest')}>
                        <Text style={styles.optionText}>Newest</Text>
                        <Icon name={selectedOption === 'Newest' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#00bcd4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow} onPress={() => handleSelect('Least Expensive')}>
                        <Text style={styles.optionText}>Least Expensive</Text>
                        <Icon name={selectedOption === 'Least Expensive' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#00bcd4" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow} onPress={() => handleSelect('Most Expensive')}>
                        <Text style={styles.optionText}>Most Expensive</Text>
                        <Icon name={selectedOption === 'Most Expensive' ? 'radiobox-marked' : 'radiobox-blank'} size={24} color="#00bcd4" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        width: '95%',
        alignItems: 'stretch',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default SortByModal;