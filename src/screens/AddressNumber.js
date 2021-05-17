import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, LogBox } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default AddressNumber = ({ navigation, route }) => {

    const[number, setNumber] = useState('');

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    function handleConfirmar() {
        route.params.setAddressHome(route.params.address, number, route.params.city);
        navigation.navigate('Home');
    }

    function handleChangeText(text){
        setNumber(text);
    }   

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Por favor, digite o número para o endereço</Text>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{route.params.address}, {route.params.city}</Text>
            </View>
            <TextInput
                style={styles.number}
                onChangeText={text => handleChangeText(text)}
            />
            <Text style={styles.tip}>Deixe o campo vazio se não souber 😉</Text>
            <FlatButton style={styles.button} onPress={handleConfirmar} label="CONFIRMAR" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        fontFamily: fonts.text,
        fontSize: 16,
        marginBottom: 20
    },
    addressContainer: {
        flexDirection: 'row'
    },
    address: {
        fontFamily: fonts.heading,
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        padding: 5,
        textAlign: 'center'
    },
    number: {
        backgroundColor: colors.white,
        width: '40%',
        fontFamily: fonts.text,
        fontSize: 20,
        margin: 25,
        textAlign: 'center',
        padding: 10,
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.blue
    },
    tip: {
        fontFamily: fonts.text,
        fontSize: 15
    },
    button: {
        marginTop: 40
    }
});