import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import { globalStyles } from '../styles/global';

import Icon from '../components/Icon';
import colors from '../styles/colors';

export default Home = ({ navigation }) => {

    const [errorMsg, setErrorMsg] = useState(null);
    const [regionLocal, setRegionLocal] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setRegionLocal({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
            });
        })();
    }, []);

    function handleAddProblem() {
        navigation.navigate('NewProblem', {latitude: regionLocal.latitude, longitude: regionLocal.longitude});
    }

    function onMapRegionChange(region) {
        setRegionLocal(region);
    }

    return (
        <View style={globalStyles.container}>

            <View style={[globalStyles.container, styles.mapContainer]}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    region={regionLocal}
                    onRegionChange={(reg) => onMapRegionChange(reg)}
                >
                </MapView>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddProblem}
                >
                    <Icon
                        iconFamily="MaterialCommunityIcons"
                        iconName="plus-circle"
                        color={colors.orange}
                        size={60}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 12,
    },
    button: {},
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
