import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

type NotificationType = 'order' | 'promotion' | 'system' | 'delivery';

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

export default function NotificationScreen() {
    const navigation = useNavigation<any>();
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'order',
            title: 'Order Confirmed',
            message: 'Your order #12345 has been confirmed and is being processed.',
            time: '2 minutes ago',
            read: false,
        },
        {
            id: '2',
            type: 'delivery',
            title: 'Out for Delivery',
            message: 'Your package is out for delivery and will arrive today.',
            time: '1 hour ago',
            read: false,
        },
        {
            id: '3',
            type: 'promotion',
            title: 'Special Offer! 50% Off',
            message: 'Get 50% off on selected items. Limited time offer!',
            time: '3 hours ago',
            read: true,
        },
        {
            id: '4',
            type: 'order',
            title: 'Order Delivered',
            message: 'Your order #12340 has been delivered successfully.',
            time: 'Yesterday',
            read: true,
        },
        {
            id: '5',
            type: 'system',
            title: 'Account Security',
            message: 'Your password was changed successfully.',
            time: '2 days ago',
            read: true,
        },
        {
            id: '6',
            type: 'promotion',
            title: 'New Arrivals',
            message: 'Check out our latest collection of products.',
            time: '3 days ago',
            read: true,
        },
    ]);

    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case 'order':
                return { name: 'receipt-outline', color: '#2D5F2E' };
            case 'delivery':
                return { name: 'bicycle-outline', color: '#1976D2' };
            case 'promotion':
                return { name: 'pricetag-outline', color: '#FF9800' };
            case 'system':
                return { name: 'settings-outline', color: '#666' };
            default:
                return { name: 'notifications-outline', color: '#666' };
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const renderEmptyNotifications = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Ionicons name="notifications-off-outline" size={80} color="#CCC" />
            </View>
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </View>
    );

    const renderNotificationItem = ({ item }: { item: Notification }) => {
        const icon = getNotificationIcon(item.type);

        return (
            <TouchableOpacity
                style={[styles.notificationItem, !item.read && styles.unreadItem]}
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.7}
            >
                <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
                    <Ionicons name={icon.name as any} size={24} color={icon.color} />
                </View>

                <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                        {item.message}
                    </Text>
                    <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                {unreadCount > 0 && (
                    <TouchableOpacity onPress={markAllAsRead}>
                        <Text style={styles.markAllButton}>Mark all read</Text>
                    </TouchableOpacity>
                )}
                {unreadCount === 0 && <View style={{ width: 40 }} />}
            </View>

            {unreadCount > 0 && (
                <View style={styles.unreadBanner}>
                    <Ionicons name="notifications" size={20} color="#2D5F2E" />
                    <Text style={styles.unreadText}>
                        You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                    </Text>
                </View>
            )}

            {notifications.length === 0 ? (
                renderEmptyNotifications()
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    markAllButton: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2D5F2E',
    },
    unreadBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 8,
    },
    unreadText: {
        fontSize: 14,
        color: '#2D5F2E',
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    unreadItem: {
        backgroundColor: '#FAFBFC',
        borderLeftWidth: 3,
        borderLeftColor: '#2D5F2E',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2D5F2E',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 8,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
});