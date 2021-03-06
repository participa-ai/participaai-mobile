import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Logo from '../assets/images/participa-p.svg';
import Center from '../assets/images/center-map-icon.svg';

import Icon from '../components/Icon';

export default Home = ({ navigation, route }) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState('Pesquisar endereço');
    const [regionLocal, setRegionLocal] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    const [useUserLocation, setUseUserLocation] = useState(true);
    const [mapView, setMapView] = useState(React.createRef());
    const [manualLatitude, setManualLatitude] = useState(0.0);
    const [manualLongitude, setManualLongitude] = useState(0.0);

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
                longitudeDelta: 0.0005,
            });
        })();
    }, []);

    async function handleManualLocation(manualLocation) {
        setUseUserLocation(false);

        const completeAddress = await getAddressByCoordinates(
            manualLocation.latitude,
            manualLocation.longitude
        );
        setAddress(completeAddress);

        setRegionLocal({
            latitude: manualLocation.latitude,
            longitude: manualLocation.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
        });

        setManualLatitude(manualLocation.latitude);
        setManualLongitude(manualLocation.longitude);

        handleCenter(manualLocation.latitude, manualLocation.longitude);
    }

    useFocusEffect(() => {
        if (route?.params?.manualLocation) {
            handleManualLocation(route.params.manualLocation);
            route.params.manualLocation = null;
        }
    });

    function setAddressHome(address, number, city) {
        setUseUserLocation(false);

        let fullAddress = address;

        if (number) fullAddress += ', ' + number;

        if (city) fullAddress += ', ' + city;

        setAddress(fullAddress);

        Location.geocodeAsync(fullAddress)
            .then((results) => {
                if (results.length <= 0) {
                    Alert.alert(
                        '',
                        'Não foi a encontrada a coordenada deste endereço!'
                    );
                    return;
                }

                setRegionLocal({
                    latitude: results[0].latitude,
                    longitude: results[0].longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005,
                });

                setManualLatitude(results[0].latitude);
                setManualLongitude(results[0].longitude);

                handleCenter(results[0].latitude, results[0].longitude);
            })
            .catch((error) => console.log(error));
    }

    async function getAddressByCoordinates(latitude, longitude) {
        let addressInformation = null;
        let address = null;
        let number = null;
        let city = null;
        let completeAddress = 'Sem informações do endereço';

        try {
            const addressesInformations = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (addressesInformations.length <= 0) {
                setAddress(completeAddress);
                return;
            }

            addressInformation = addressesInformations[0];

            if (addressInformation.street) address = addressInformation.street;

            if (addressInformation.name) number = addressInformation.name;

            if (addressInformation.subregion)
                city = addressInformation.subregion;

            if (address) {
                completeAddress = address;
                completeAddress += number ? `, ${number}` : '';
                completeAddress += city ? `, ${city}` : '';
            }
        } catch (err) {
            console.log(err);
        }

        return completeAddress;
    }

    function handleAddProblem() {
        navigation.navigate('NewProblem', {
            latitude: regionLocal.latitude,
            longitude: regionLocal.longitude,
        });
    }

    function handleSearchAddress() {
        navigation.navigate('SearchAddress', {
            placeholder: 'Pesquisar Endereço',
            setAddressHome: setAddressHome,
        });
    }

    async function onUserLocationChange(region) {
        if (useUserLocation) {
            setRegionLocal({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005,
            });

            const completeAddress = await getAddressByCoordinates(
                region.latitude,
                region.longitude
            );
            setAddress(completeAddress);
            handleCenter(region.latitude, region.longitude);
        }
    }

    function handleCenter(latitude, longitude) {
        mapView.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
        });
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.container, styles.mapContainer]}>
                <MapView
                    style={styles.map}
                    showsUserLocation={useUserLocation}
                    showsMyLocationButton={false}
                    onUserLocationChange={(e) =>
                        onUserLocationChange({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        })
                    }
                    ref={(component) => setMapView(component)}
                    provider={PROVIDER_GOOGLE}
                >
                    {!useUserLocation ? (
                        <Marker
                            coordinate={{
                                latitude: manualLatitude,
                                longitude: manualLongitude,
                            }}
                        ></Marker>
                    ) : (
                        <View></View>
                    )}
                </MapView>
            </View>
            <View style={{ position: 'absolute', top: 50 }}>
                <TouchableOpacity
                    style={styles.buttonSearchAddress}
                    activeOpacity={1}
                >
                    <View style={{ flex: 1, marginTop: 5 }}>
                        <Logo width={25} height={25} />
                    </View>

                    <TouchableOpacity
                        onPress={handleSearchAddress}
                        activeOpacity={1}
                        style={{ width: '100%', flex: 8 }}
                    >
                        <Text style={styles.address}>{address}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: '100%',
                            height: '100%',
                            flex: 1,
                            marginTop: 5,
                        }}
                        onPress={() => {
                            setUseUserLocation(true);
                            handleCenter(
                                regionLocal.latitude,
                                regionLocal.longitude
                            );
                        }}
                    >
                        <Center fill={colors.orange} width={25} height={25} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddProblem}>
                    <Icon
                        iconFamily="MaterialCommunityIcons"
                        iconName="plus-circle"
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
        flex: 1,
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
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    address: {
        marginLeft: 10,
    },
});
