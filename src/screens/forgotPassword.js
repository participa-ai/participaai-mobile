import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import FlatIconInput from '../components/flatIconInput';
import Logo from '../components/logo';
import FlatButton from '../components/flatButton';

export default class ForgotPassword extends Component {
    handleRequestRecovery = () => {
        this.props.navigation.navigate('RecoveryEmailSent');
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
                        Para alterar sua senha, digite abaixo o e-mail
                        cadastrado.
                    </Text>

                    <Text style={styles.text}>
                        Vamos te enviar as instruções para resetar sua senha.
                    </Text>

                    <FlatIconInput
                        iconFamily="MaterialIcons"
                        iconName="alternate-email"
                        placeholder="E-Mail"
                        style={styles.input}
                    />

                    <FlatButton
                        style={styles.button}
                        onPress={this.handleLogin}
                        label="Solicitar troca de senha"
                        onPress={this.handleRequestRecovery}
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
        marginBottom: 40,
    },
    text: {
        fontFamily: 'roboto-regular',
        fontSize: 20,
        textAlign: 'center',

        maxWidth: '90%',
        marginTop: 20,
    },
    input: {
        marginTop: 35,
    },
    button: {
        marginTop: 20,
    },
});
