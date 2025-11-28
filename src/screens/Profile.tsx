import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/authContext';
import Ionicons from '@react-native-vector-icons/ionicons';
import ButtonCustom from '../components/Button';
import { useCart } from '../contexts/cartContext';
import { useWishlist } from '../contexts/wishlistContext';

const ProfileScreen = () => {
    const { logout, username } = useAuth();
    const { cartItems, clearCart } = useCart();
    const { wishlistItems, clearWishlist } = useWishlist();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                    clearCart();
                    clearWishlist();
                    logout();
                }
            }
        ])
    };

    const menuItems = [
        { id: '1', icon: 'person-outline', title: 'Edit Profile', subtitle: 'Update your personal information', onPress: () => { } },
        { id: '2', icon: 'location-outline', title: 'Addresses', subtitle: 'Manage shipping addresses', onPress: () => { } },
        { id: '3', icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage payment options', onPress: () => { } },
        { id: '4', icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage notification preferences', onPress: () => { } },
        { id: '5', icon: 'shield-checkmark-outline', title: 'Privacy & Security', subtitle: 'Control your privacy settings', onPress: () => { } },
        { id: '6', icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get help and contact us', onPress: () => { } },
        { id: '7', icon: 'information-circle-outline', title: 'About', subtitle: 'App version and information', onPress: () => { } },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                <View style={styles.userCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={40} color="#2D5F2E" />
                        </View>
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{username || 'Guest User'}</Text>
                        <Text style={styles.userEmail}>user@example.com</Text>
                    </View>

                    <TouchableOpacity style={styles.editProfileButton}>
                        <Ionicons name="create-outline" size={20} color="#2D5F2E" />
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="cart-outline" size={24} color="#2D5F2E" />
                        <Text style={styles.statValue}>{cartItems.length ?? 0}</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="heart-outline" size={24} color="#FF4444" />
                        <Text style={styles.statValue}>{wishlistItems.length ?? 0}</Text>
                        <Text style={styles.statLabel}>Wishlist</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="star-outline" size={24} color="#FFD700" />
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Settings</Text>

                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && styles.menuItemLast
                            ]}
                            onPress={item.onPress}
                        >
                            <View style={styles.menuIconContainer}>
                                <Ionicons name={item.icon as any} size={22} color="#2D5F2E" />
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#CCC" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.logoutContainer}>
                    <ButtonCustom
                        title="Logout"
                        onPress={handleLogout}
                        iconLibrary="ionicons"
                        iconName="log-out-outline"
                        iconSize={20}
                        variant="outline"
                    />
                </View>

                <Text style={styles.versionText}>Version 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#2D5F2E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    userInfo: {
        flex: 1,
        marginLeft: 16,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    editProfileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 16,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    menuSection: {
        marginTop: 24,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },
    menuItemLast: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    logoutContainer: {
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 16,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#999',
        marginBottom: 24,
    },
});

export default ProfileScreen;
