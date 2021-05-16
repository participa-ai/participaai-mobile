import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import { globalStyles } from '../styles/global';
import Logo from '../assets/images/participa-p.svg';
import Center from '../assets/images/center-map-icon.svg';
import Icon from '../components/Icon';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default Home = ({ navigation }) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState('Pesquisar endereço');
    const [regionLocal, setRegionLocal] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    });
    const [useUserLocation, setUseUserLocation] = useState(true);
    const mapView = React.createRef();

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
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005
            });
        })();
    }, []);

    function setAddressHome(addressHome) {
        setUseUserLocation(false);
        setAddress(addressHome);
    }

    function handleAddProblem() {
        navigation.navigate('NewProblem', { latitude: regionLocal.latitude, longitude: regionLocal.longitude });
    }

    function handleSearchAddress() {
        navigation.navigate('SearchAddress', { placeholder: 'Pesquisar Endereço', setAddressHome: setAddressHome });
    }

    function onUserLocationChange(region) {
        setRegionLocal({ latitude: region.latitude, longitude: region.longitude, latitudeDelta: 0.0005, longitudeDelta: 0.0005 });

        if (useUserLocation)
            handleCenter();
    }

    function handleCenter() {
        mapView.current.animateToRegion({
            latitude: regionLocal.latitude,
            longitude: regionLocal.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005
        });
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.container, styles.mapContainer]}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    onUserLocationChange={e => onUserLocationChange({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
                    ref={mapView}
                >
                </MapView>
            </View>
            <View style={{ position: 'absolute', top: 50 }}>
                <TouchableOpacity
                    style={styles.buttonSearchAddress}
                    activeOpacity={1}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <Logo
                            width={25}
                            height={25}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleSearchAddress}
                        activeOpacity={1}
                        style={{ width: '100%', flex: 8 }}
                    >
                        <Text
                            style={styles.address}
                        >
                            {address}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ width: '100%', height: '100%', flex: 1 }}
                        onPress={
                            () => {
                                setUseUserLocation(true);
                                handleCenter();
                            }
                        }
                    >
                        <Center
                            fill={colors.orange}
                            width={25}
                            height={25}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleAddProblem}
                >
                    <Icon
                        iconFamily='MaterialCommunityIcons'
                        iconName='plus-circle'
                        color={colors.orange}
                        size={60}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    addressContainer: {
        flex: 1
    },
    buttonSearchAddress: {
        width: Dimensions.get('screen').width * 0.9,
        backgroundColor: colors.white,
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.blue,
        padding: 11,
        color: colors.black,
        fontFamily: fonts.text,
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    address: {
        marginLeft: 10
    }
});
