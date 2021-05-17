import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    LogBox,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import mime from 'mime';

export default CameraScreen = ({ navigation, route }) => {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
    const [hasPermissionMedia, setHasPermissionMedia] = useState(null);
    const [opacity, setOpacity] = useState(new Animated.Value(1));

    const type = Camera.Constants.Type.back;
    let camera = new Camera();

    useEffect(() => {
        async function askPermission() {
            const permissionResponse = await Camera.requestPermissionsAsync();
            const permissionResponseMedia =
                await MediaLibrary.requestPermissionsAsync();
            setHasPermissionCamera(permissionResponse.status === 'granted');
            setHasPermissionMedia(permissionResponseMedia.status === 'granted');
        }

        askPermission();
    }, []);

    function takePicture() {
        if (camera) {
            fadeOutAndIn();

            camera
                .takePictureAsync({ base64: true, quality: 0 })
                .then((resp) => {
                    if (hasPermissionMedia) {
                        const newImageUri =
                            'file:///' + resp.uri.split('file:/').join('');

                        route.params.setBase64Img({
                            uri: newImageUri,
                            type: mime.getType(newImageUri),
                            name: newImageUri.split('/').pop(),
                        });

                        MediaLibrary.saveToLibraryAsync(resp.uri);

                        navigation.navigate('NewProblem');
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    async function fadeOutAndIn() {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => fadeIn());
    }

    async function fadeIn() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    if (hasPermissionCamera === null) return <View />;
    else if (hasPermissionCamera === false)
        return <Text>Sem acesso a câmera</Text>;
    else {
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: opacity,
                    },
                ]}
            >
                <View style={styles.container}>
                    <Camera
                        style={styles.camera}
                        type={type}
                        ref={(ref) => {
                            camera = ref;
                        }}
                    >
                        <View style={styles.containerCamera}>
                            <TouchableOpacity style={styles.touchIcon}>
                                <FontAwesome
                                    style={styles.icon}
                                    name="camera"
                                    onPress={takePicture}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    icon: {
        color: '#fff',
        fontSize: 40,
    },
    containerCamera: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
    touchIcon: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
