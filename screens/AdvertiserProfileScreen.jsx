import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { ArrowLeft, Phone, MessageSquare } from 'lucide-react-native';

const AdvertiserProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Advertiser Profile</Text>
                <View style={{ width: 24 }} /> {/* Balance layout */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                    style={styles.profileImage}
                />

                <Text style={styles.name}>Daniel Pinto</Text>
                <Text style={styles.status}>Online 2 hours ago</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About Daniel</Text>
                    <Text style={styles.sectionText}>
                        Hi! I'm Daniel, a real estate agent with 5+ years of experience
                        helping clients find their dream homes. Feel free to reach out!
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Info</Text>
                    <Text style={styles.sectionText}>Phone: +91 9876543210</Text>
                    <Text style={styles.sectionText}>Email: daniel@example.com</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton}>
                    <Phone size={24} color="#fff" />
                    <Text style={styles.bottomButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButtonSecondary}>
                    <MessageSquare size={24} color="#fff" />
                    <Text style={styles.bottomButtonTextSecondary}>Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    scrollContent: { alignItems: 'center', padding: 16 },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 12
    },
    name: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    status: { fontSize: 14, color: '#6B7280', marginTop: 4 },
    section: { width: '100%', marginTop: 24 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    sectionText: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
    bottomBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 12,
        justifyContent: 'space-around'
    },
    bottomButton: {
        backgroundColor: '#06B6D4',
        padding: 14,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomButtonSecondary: {
        backgroundColor: '#06B6D4',
        padding: 14,
        borderRadius: 8,
        width: '45%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16
    },
    bottomButtonTextSecondary: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16
    }
});

export default AdvertiserProfileScreen;
