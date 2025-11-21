import React, { useState } from 'react';
import { View, Button, Image, FlatList, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImagePickerGallery = () => {
    const [images, setImages] = useState([]);

    const pickImages = () => {
        const options = {
            mediaType: 'photo',
            selectionLimit: 0, // 0 artinya tidak terbatas (Unlimited)
            quality: 0.8,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
                return;
            }
            if (response.assets) {
                setImages(response.assets);
            }
        });
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Button title="Pilih dari Galeri" onPress={pickImages} />
            <FlatList
                data={images}
                keyExtractor={(item) => item.uri}
                numColumns={3} // Tampilan Grid 3 kolom
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 100, height: 100, margin: 5 }}
                    />
                )}
            />
        </View>
    );
};

export default ImagePickerGallery;