import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import { globalStyles } from '../styles/global';
import Logo from '../assets/images/participa-p.svg';
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
    const [map, setMap] = useState(null);

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
        setAddress(addressHome);
    }

    function handleAddProblem() {
        navigation.navigate('NewProblem', { latitude: regionLocal.latitude, longitude: regionLocal.longitude });
    }

    function handleSearchAddress() {
        navigation.navigate('SearchAddress', { placeholder: 'Pesquisar Endereço', setAddressHome: setAddressHome });
    }

    function onMapRegionChangeComplete(region) {
        setRegionLocal(region);
    }

    function handleCenter() {
        map.animateCamera(regionLocal, 1000);
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.container, styles.mapContainer]}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    onRegionChangeComplete={(reg) => onMapRegionChangeComplete(reg)}
                    ref={component => { setMap(component) }}
                >
                </MapView>
            </View>
            <View style={{ position: 'absolute', top: 50 }}>
                <TouchableOpacity
                    style={styles.buttonSearchAddress}
                    activeOpacity={1}
                >
                    <Logo
                        width={20}
                        height={20}
                    />
                    <TouchableOpacity
                        onPress={handleSearchAddress}
                        activeOpacity={1}
                        style={{ width: '100%' }}
                    >
                        <Text
                            style={styles.address}
                        >
                            {address}
                        </Text>
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
            <Button onPress={handleCenter} title='Centralizar' />
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
    },
    map: {
        width: '100%',
        height: '100%'
    },
    address: {
        marginLeft: 10
    }
});
