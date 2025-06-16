import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    StatusBar,
    Modal,
    TextInput
} from 'react-native';
import {
    Share2,
    Heart,
    MapPin,
    Home,
    BedDouble,
    ShowerHead,
    Ruler,
    Maximize2,
    Dumbbell,
    Car,
    Trees,
    Baby,
    Building2,
    Sofa,
    Map as MapIcon,
    ArrowLeft,
    Train,
    School,
    GraduationCap,
    Hospital,
    Bus,
    Plane,
    Phone,
    MessageSquare,
    ChevronRight,
    X
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({ navigation, route }) => {
    const { isSharedProperty } = route.params || { isSharedProperty: false };
    const [isAdvertiserModalVisible, setAdvertiserModalVisible] = useState(false);
    const [messageText, setMessageText] = useState('');

    const Amenity = ({ icon: Icon, label }) => (
        <View style={styles.amenityItem}>
            <Icon size={18} color="#4B5563" />
            <Text style={[styles.amenityLabel, { marginLeft: 8 }]}>{label}</Text>
        </View>
    );

    const AdditionalDetailItem = ({ icon: Icon, label, navigateTo }) => (
        <TouchableOpacity style={styles.additionalItem} onPress={() => navigation.navigate(navigateTo)}>
            <View style={styles.row}>
                <Icon size={18} color="#4B5563" />
                <Text style={[styles.additionalLabel, { marginLeft: 8 }]}>{label}</Text>
            </View>
            <View style={styles.additionalRight}>
                <ChevronRight size={18} color="black" />
            </View>
        </TouchableOpacity>
    );

    const GridItem = ({ icon: Icon, label, value }) => (
        <View style={styles.gridItem}>
            <Icon size={20} color="#4B5563" />
            <Text style={styles.gridLabel}>{label}</Text>
            <Text style={styles.gridValue}>{value}</Text>
        </View>
    );

    const LettingDetailItem = ({ label, value }) => (
        <View style={styles.lettingDetail}>
            <Text style={styles.lettingDetailLabel}>{label}</Text>
            <Text style={styles.lettingDetailValue}>{value}</Text>
        </View>
    );

    const ExistingFlatmateItem = ({ label, value }) => (
        <View style={styles.existingFlatmateItem}>
            <Text style={styles.existingFlatmateLabel}>{label}:</Text>
            <Text style={styles.existingFlatmateValue}>{value}</Text>
        </View>
    );

    const RoomSharingDetails = () => (
        <View style={styles.roomSharingCard}>
            <Text style={styles.roomSharingTitle}>Room 1</Text>
            <Text style={styles.roomSharingSubtitle}>Double Room Sharing</Text>
            <View style={styles.roomSharingAvailability}>
                <Text style={styles.roomSharingAvailable}>Available</Text>
            </View>
            <Text style={styles.roomFacilitiesTitle}>Room Facilities</Text>
            <View>
                <View style={styles.row}>
                    <BedDouble size={16} color="#4B5563" />
                    <Text style={styles.roomFacilityText}>Independent Bed</Text>
                </View>
                <View style={styles.row}>
                    <Home size={16} color="#4B5563" />
                    <Text style={styles.roomFacilityText}>Independent Cupboard</Text>
                </View>
                <View style={styles.row}>
                    <ShowerHead size={16} color="#4B5563" />
                    <Text style={styles.roomFacilityText}>Shared Bathroom</Text>
                </View>
            </View>
            <View style={styles.roomSharingPricing}>
                <View>
                    <Text style={styles.rentLabel}>Rent</Text>
                    <Text style={styles.rentValue}>₹1200</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.depositLabel}>Deposit</Text>
                    <Text style={styles.depositValue}>₹2400</Text>
                </View>
            </View>
        </View>
    );

    const openAdvertiserModal = () => {
        setAdvertiserModalVisible(true);
    };

    const closeAdvertiserModal = () => {
        setAdvertiserModalVisible(false);
        setMessageText('');
    };

    const handleSendMessage = () => {
        console.log('Sending message:', messageText);
        closeAdvertiserModal();
        // In a real app, you would send the message here
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Property Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView>
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
                    }}
                    style={styles.image}
                />

                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.price}>
                                {isSharedProperty ? '₹2400' : '₹30,00,000'}
                                {isSharedProperty && <Text style={{ fontSize: 14, color: '#6B7280' }}> Per Month</Text>}
                            </Text>
                            <Text style={styles.apartmentName}>Apartment Name</Text>
                            <View style={styles.row}>
                                <MapPin size={14} color="#6B7280" />
                                <Text style={[styles.address, { marginLeft: 6 }]}>
                                    Gangapur Road, Nashik, Maharashtra.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.iconButton, { marginRight: 8 }]}>
                                <Share2 size={22} color="#6B7280" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Heart size={22} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.gridContainer}>
                        <GridItem icon={Home} label="Property Type" value="Apartment" />
                        <GridItem icon={BedDouble} label="No. of Rooms" value="2BHK" />
                        <GridItem icon={ShowerHead} label="Bathroom" value="1" />
                        <GridItem icon={Ruler} label="Area" value="1200 sq ft." />
                    </View>
                </View>

                {/* Room Sharing Details - Shown when isSharedProperty is true */}
                {isSharedProperty && (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Rooms Available</Text>
                        <RoomSharingDetails />
                    </View>
                )}

                {/* Letting Details - Always shown */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Letting Details</Text>
                            {!isSharedProperty && (
                        <>
                            <LettingDetailItem label="Rent" value="₹1200" />
                            <LettingDetailItem label="Deposit" value="₹7200" />
                        </>
                    )}
                    <LettingDetailItem label="Available From" value="25/05/2025" />
                    <LettingDetailItem label="Minimum Stay" value="6 Months" />
                    <LettingDetailItem label="Maximum Stay" value="None" />
                    {/* Conditionally show Rent and Deposit here if not a shared property */}
            
                </View>

                <TouchableOpacity style={styles.card}>
                    <View style={styles.rowBetween}>
                        <View style={styles.row}>
                            <Maximize2 size={16} color="#6B7280" />
                            <Text style={[styles.floorPlanText, { marginLeft: 8 }]}>Floor Plan</Text>
                        </View>
                        <ChevronRight size={20} color="#6B7280" />
                    </View>
                </TouchableOpacity>

                {/* Map Section */}
                <View style={styles.card}>
                    {/* <Text style={styles.sectionTitle}>Location</Text> */}
                    <Image
                        source={{
                            uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Gangapur+Road,Nashik&zoom=15&size=400x200&markers=color:red%7Clabel:P%7CGangapur+Road,Nashik&key=YOUR_GOOGLE_MAPS_API_KEY'
                        }}
                        style={styles.map}
                    />
                    <TouchableOpacity style={[styles.row, { marginTop: 10, alignItems: 'center' }]}>
                        <MapIcon size={16} color="#06B6D4" />
                        <Text style={{ color: '#06B6D4', marginLeft: 5 }}>View on map</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </Text>
                    <TouchableOpacity style={{ marginTop: 8 }}>
                        <Text style={styles.viewMore}>View full description</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenitiesGrid}>
                        <Amenity icon={Dumbbell} label="Gym" />
                        <Amenity icon={Building2} label="Lift" />
                        <Amenity icon={Trees} label="Garden" />
                        <Amenity icon={Home} label="Terrace" />
                        <Amenity icon={Baby} label="Kids Area" />
                        <Amenity icon={Home} label="Balcony" />
                        <Amenity icon={Car} label="Parking" />
                        <Amenity icon={Sofa} label="Furnished" />
                    </View>
                </View>

                {/* OTHER Section - Always Shown */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Other</Text>
                    <AdditionalDetailItem icon={Train} label="Nearest Station" navigateTo="NearestStationScreen" />
                    <AdditionalDetailItem icon={School} label="Nearest School" navigateTo="NearestSchoolScreen" />
                    <AdditionalDetailItem icon={GraduationCap} label="Nearest College" navigateTo="NearestCollegeScreen" />
                    <AdditionalDetailItem icon={Hospital} label="Nearest Hospital" navigateTo="NearestHospitalScreen" />
                    <AdditionalDetailItem icon={Bus} label="Nearest Bus Stop" navigateTo="NearestBusStopScreen" />
                    <AdditionalDetailItem icon={Plane} label="Nearest Airport" navigateTo="NearestAirportScreen" />
                </View>

                {/* Conditionally render "Existing Flatmates" for shared properties */}
           {/* Conditionally render "Existing Flatmates" for shared properties */}
                {isSharedProperty && (
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Existing Flatmates</Text>
                        <View>
                            <View style={styles.row}>
                                {/* You'll need an icon for Male here */}
                                <Text style={[styles.existingFlatmateValue, { marginLeft: 8 }]}>2 Males</Text>
                            </View>
                            <View style={styles.row}>
                                {/* You'll need an icon for Female here */}
                                <Text style={[styles.existingFlatmateValue, { marginLeft: 8 }]}>2 Females</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.existingFlatmateValue, { marginLeft: 8 }]}>Students & Professionals</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>New Tenant Preference</Text>
                    <View style={styles.additionalDetails}>
                        <View style={styles.row}>
                            <Home size={18} color="#4B5563" />
                            <Text style={[styles.additionalLabel, { marginLeft: 8 }]}>Smoking allowed</Text>
                        </View>
                        <View style={styles.row}>
                            <Home size={18} color="#4B5563" />
                            <Text style={[styles.additionalLabel, { marginLeft: 8 }]}>Couples Welcome</Text>
                        </View>
                        <View style={styles.row}>
                            <Home size={18} color="#4B5563" />
                            <Text style={[styles.additionalLabel, { marginLeft: 8 }]}>Professionals or Students</Text>
                        </View>
                        <View style={styles.row}>
                            <Home size={18} color="#4B5563" />
                            <Text style={[styles.additionalLabel, { marginLeft: 8 }]}>Pets Considered</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.card} onPress={openAdvertiserModal}>
                    <Text style={styles.sectionTitle}>About Advertiser</Text>
                    <View style={[styles.row, { marginTop: 12, alignItems: 'center', justifyContent: 'space-between' }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#111827' }}>
                                Daniel Pinto
                            </Text>
                            <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 2 }}>
                                Last Active: 20mins ago
                            </Text>
                        </View>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                            style={styles.agentImage}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton}>
                    <Phone size={24} color="#fff" />
                    <Text style={[styles.bottomButtonText, { marginLeft: 8 }]}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButtonSecondary} onPress={openAdvertiserModal}>
                    <MessageSquare size={24} color="#fff" />
                    <Text style={[styles.bottomButtonTextSecondary, { marginLeft: 8 }]}>Message</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAdvertiserModalVisible}
                onRequestClose={closeAdvertiserModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Daniel Pinto</Text>
                            <TouchableOpacity onPress={closeAdvertiserModal}>
                                <X size={24} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalSubtitle}>Online 2 Hours ago</Text>

                        <TouchableOpacity onPress={() => {
                            closeAdvertiserModal();
                            // Navigation if you tap on the advertiser info in the modal
                            // navigation.navigate('AdvertiserProfileScreen');
                        }}>
                            <View style={[styles.row, { marginTop: 16 }]}>
                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                    style={styles.modalAgentImage}
                                />
                                <View style={{ marginLeft: 12, flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#111827' }}>
                                        Daniel Pinto
                                    </Text>
                                    <Text style={{ color: '#6B7280', fontSize: 14, marginTop: 2 }}>
                                        View Profile
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <ChevronRight size={20} color="#6B7280" />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.modalIntroduceText}>
                            Introduce yourself, your offer, your budget etc. Keep it sweet and simple!
                        </Text>
                        <TextInput
                            style={styles.modalTextInput}
                            onChangeText={setMessageText}
                            value={messageText}
                            placeholder="Message Daniel"
                            multiline
                            numberOfLines={4}
                            maxLength={180}
                        />
                        <Text style={styles.modalTextLimit}>Max 180 words</Text>

                        <TouchableOpacity style={styles.modalSendButton} onPress={handleSendMessage}>
                            <Text style={styles.modalSendButtonText}>Send Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    image: { width: '100%', height: 220 },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginVertical: 8
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
    apartmentName: { fontSize: 16, color: '#6B7280', marginBottom: 6 },
    address: { fontSize: 14, color: '#6B7280' },
    iconButton: {},
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    },
    gridItem: {
        width: '50%',
        marginVertical: 10
    },
    gridLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
    gridValue: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginTop: 2 },
    floorPlanText: { fontSize: 14, color: '#111827' },
    map: { width: '100%', height: 180, marginVertical: 12 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    descriptionText: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
    viewMore: { fontSize: 14, color: '#009CA0', marginTop: 6 },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12
    },
    amenityItem: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingRight: 15,
    },
    amenityLabel: { fontSize: 14, color: '#4B5563', marginLeft: 8, flexShrink: 1 },
    additionalDetails: { marginTop: 12 },
    additionalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
    },
    additionalLabel: { fontSize: 14, color: '#111827' },
    additionalRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    agentImage: { width: 50, height: 50, borderRadius: 25 },
    bottomBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 12,
    justifyContent: 'space-around',
    },
    
   bottomButton: {
        backgroundColor: '#009CA0',
        height: 48,
        borderRadius: 4,
        paddingTop: 12,
        paddingRight: 20,
        paddingBottom: 12,
        paddingLeft: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 8,
        flex: 1, // Take up available space
    },
    bottomButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
    bottomButtonSecondary: {
        backgroundColor: '#009CA0', // Assuming you want the same color
        height: 48,
        borderRadius: 4,
        paddingTop: 12,
        paddingRight: 72,
        paddingBottom: 12,
        paddingLeft: 72,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 8,
        flex: 2, // Take up more space for the "Message" button look
    },
    bottomButtonTextSecondary: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    modalAgentImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    modalIntroduceText: {
        fontSize: 14,
        color: '#4B5563',marginBottom: 16,
    },
    modalTextInput: {
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    modalTextLimit: {
        fontSize: 12,
        color: '#6B7280',
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    modalSendButton: {
        backgroundColor: '#06B6D4',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },
    modalSendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    lettingDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    lettingDetailLabel: {
        fontSize: 14,
        color: '#4B5563',
    },
    lettingDetailValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
 
existingFlatmateItem: {
        paddingVertical: 6,
        // borderBottomWidth: 1, // Removed the border for individual items
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center', // Align items in the row
    },
    existingFlatmateLabel: {
        fontSize: 14,
        color: '#4B5563',
        marginRight: 8, // Add some space between icon and text if you use icons
    },
    existingFlatmateValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
    },
    roomSharingCard: {
        padding: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        marginBottom: 16,
        borderColor: '#E5E7EB',
        borderWidth: 1,
    },
    roomSharingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    roomSharingSubtitle: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 12,
    },
    roomSharingAvailability: {
        backgroundColor: '#D1FAE5',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    roomSharingAvailable: {
        color: '#047857',
        fontWeight: 'bold',
        fontSize: 12,
    },
    roomFacilitiesTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
        marginTop: 12,
        marginBottom: 8,
    },
    roomFacilityText: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 8,
    },
    roomSharingPricing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    rentLabel: {
        fontSize: 14,
        color: '#4B5563',
    },
    rentValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    depositLabel: {
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'right',
    },
    depositValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'right',
    },
});

export default PropertyDetailsScreen;