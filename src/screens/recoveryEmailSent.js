import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import FlatButton from '../components/flatButton';
import Logo from '../components/logo';

export default class RecoveryEmailSent extends Component {
    handleOk = () => {
        this.props.navigation.popToTop();
    };

    render() {
        return (
            <View style={globalStyles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollview}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <Logo style={styles.logo} />

                    <Text style={styles.text}>
                        Nós enviamos para o seu e-mail as instruções para trocar
                        sua senha. Por favor, verifique seu e-mail!
                    </Text>

                    <FlatButton
                        style={styles.button}
                        onPress={this.handleLogin}
                        label="Voltar"
                        onPress={this.handleOk}
                    />
                </ScrollView>
                <LinearGradient
                    colors={[colors.white, colors.blue]}
                    locations={[0.3, 1]}
                    style={[
                        globalStyles.fixed,
                        globalStyles.fullscreen,
                        { zIndex: -1 },
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollview: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: '45%',
        marginBottom: 50,
    },
    text: {
        fontFamily: 'roboto-regular',
        fontSize: 20,
        textAlign: 'center',

        maxWidth: '90%',
        paddingTop: 35,
    },
    button: {
        marginTop: 95,
        paddingBottom: 10,
    },
});
