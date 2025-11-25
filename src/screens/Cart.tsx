import { Alert, PermissionsAndroid, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";

type Position = {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
}

const ACCESS_TOKEN = "pk.9ca5907eebf36fc7df0e55ce357c1275";

export default function CartScreen() {
    const [location, setLocation] = useState<Position | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState<Position | null>(null);
    const [watchId, setWatchId] = useState<number | null>(null);

    const url = `https://us1.locationiq.com/v1/reverse?key=${ACCESS_TOKEN}&lat=${coords?.latitude}&lon=${coords?.longitude}&format=json&`

    // Fungsi meminta izin di Android
    const requestPermission = async () => {
        if (Platform.OS !== 'android') {
            setErrorMsg('Izin hanya diperlukan di Android');
            return;
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Izin Lokasi',
                    message: 'Aplikasi ini memerlukan izin lokasi untuk menemukan lokasi Anda.',
                    buttonNeutral: 'Tanyakan lagi',
                    buttonNegative: 'Batalkan',
                    buttonPositive: 'Izin',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setErrorMsg('');
                return true
            } else {
                setErrorMsg('Izin ditolak');
            }
        } catch (err) {
            setErrorMsg('Gagal request permission!' + err)
            console.error("Gagal request permission!", err)
        }
    }

    const getLocation = async () => {
        setLoading(true);
        try {
            const hasPermission = await requestPermission();

            if (hasPermission) {
                Geolocation.getCurrentPosition((position) => {
                    setLocation(position.coords);
                    setErrorMsg('');
                },
                    (error) => setErrorMsg(`Error: ${error.message}`),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                )
            }
        } catch (err) {
            console.error('Gagal akses Lokasi', err)
        } finally {
            setLoading(false);
        }
    }

    const startTracking = () => {
        // Mulai melacak
        setLoading(true)
        try {
            const id = Geolocation.watchPosition(
                (position) => setCoords(position.coords),
                (error) => console.error('Error Watch:', error),
                {
                    enableHighAccuracy: true,
                    distanceFilter: 10,
                    interval: 5000
                }
            );
            setWatchId(id);
        } catch (err) {
            console.error('Gagal watch position:', err)
        } finally {
            setLoading(false)
        }
    };

    const stopTracking = () => {
        if (watchId !== null) {
            Geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    };

    // Cleanup: Pastikan pelacakan berhenti jika user menutup layar
    useEffect(() => {
        return () => {
            if (watchId !== null) Geolocation.clearWatch(watchId);
        };
    }, [watchId]);

    const accessLocation = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            Alert.alert(`Lokasi Anda: ${data.address.village} ${data.address.municipality}`);
        } catch (error) {
            console.error('Gagal akses lokasi:', error);
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(170, 167, 167, 0.3)' }}>
            <Text>CartScreen</Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }} onPress={getLocation}>
                <Text style={{ color: 'white' }}>{loading ? 'Loading...' : 'Get Location'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'green', borderRadius: 5 }} onPress={startTracking}>
                <Text style={{ color: 'white' }}>Start Tracking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 }} onPress={stopTracking}>
                <Text style={{ color: 'white' }}>Stop Tracking</Text>
            </TouchableOpacity>
            <Text>Get Location:</Text>
            <Text>Latitude : {location?.latitude?.toFixed(6) ?? ''}</Text>
            <Text>Longitude : {location?.longitude?.toFixed(6) ?? ''}</Text>

            <Text>Watch Position: </Text>
            <Text>Latitude : {coords?.latitude?.toFixed(6) ?? ''}</Text>
            <Text>Longitude : {coords?.longitude?.toFixed(6) ?? ''}</Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'orange', borderRadius: 5 }} onPress={accessLocation}>
                <Text style={{ color: 'white' }}>Access Location</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}