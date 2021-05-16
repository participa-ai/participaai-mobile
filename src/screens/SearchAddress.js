import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, LogBox } from 'react-native';

export default SearchAddress = ({ navigation, route }) => {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const [searchObject, setSearchObject] = useState({
        isLoading: false,
        isSearching: false,
        query: "",
        search: []
    });
    const [placeholder, setPlaceholder] = useState('');

    let searchInput = this;

    useEffect(() => {
        setPlaceholder(route.params.placeholder);
    }, []);

    function searchResults(text) {
        fetch('https://photon.komoot.io/api/?q=' + encodeURI(text) + "&limit=10", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                setSearchObject({ isLoading: false, search: responseJson.features });
            }).catch(e => {
                setSearchObject({ isLoading: false });
                alert('erro ' + e)
            });
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.containerStyle}>
                <TextInput
                    style={styles.inputStyle}
                    ref={(input) => { searchInput = input; }}
                    onChangeText={(t) => {
                        setSearchObject({ query: t, isSearching: true, isLoading: true });

                        if (t.length === 0) {
                            setSearchObject({ query: t, isSearching: false, isLoading: false });
                            return;
                        }

                        searchResults(t);
                    }}
                    placeholder={placeholder}
                />
                <View style={styles.searchBoxContainer}>
                    {
                        searchObject.isLoading ?
                            <Text>Pesquisando...</Text>
                            :
                            searchObject.search.map(
                                (a, i) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={
                                                () => {
                                                    route.params.setAddressHome((a.properties.street ? a.properties.street : a.properties.name));
                                                    navigation.navigate('Home');
                                                }
                                            }
                                            activeOpacity={0.9}
                                            key={"search-autocomplete-" + i}
                                            style={styles.rowStyle}
                                        >
                                            <Text
                                                style={styles.addressStyle}
                                            >
                                                {a.properties.street ? a.properties.street : a.properties.name}
                                            </Text>
                                            <Text
                                                style={styles.cityStyle}
                                            >
                                                {a.properties.city} ({a.properties.postcode})
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            )
                    }
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        padding: 20,
        zIndex: 1000,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    inputStyle: {
        height: 50,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,
        elevation: 3,
    },
    searchBoxContainer: {
        zIndex: 1000,
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 75,
        marginTop: 20,
        width: '100%'
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderColor: '#e7e7e7'
    },
    addressStyle: {
        fontSize: 14,
        fontWeight: "800"
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 10,
        color: "#000",
        marginTop: 10
    },
    cityStyle: {
        fontSize: 10,
        marginLeft: 5,
        color: '#6b6b6b'
    }
});