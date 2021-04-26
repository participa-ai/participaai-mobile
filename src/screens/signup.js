import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import FlatButton from '../components/flatButton';
import FlatIconInput from '../components/flatIconInput';
import Logo from '../components/logo';

export default class Signup extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollview}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <Logo style={styles.logo} />

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="text"
                        placeholder="Nome"
                        style={styles.input}
                        onSubmitEditing={() => {
                            this.cpfInput.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="person-circle"
                        placeholder="CPF"
                        keyboardType="numeric"
                        maskType="cpf"
                        style={styles.input}
                        ref={(input) => {
                            this.cpfInput = input;
                        }}
                        onSubmitEditing={() => {
                            this.emailInput.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <FlatIconInput
                        iconFamily="MaterialIcons"
                        iconName="alternate-email"
                        placeholder="E-Mail"
                        style={styles.input}
                        ref={(input) => {
                            this.emailInput = input;
                        }}
                        onSubmitEditing={() => {
                            this.passwordInput.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="lock-closed"
                        placeholder="Senha"
                        style={styles.input}
                        ref={(input) => {
                            this.passwordInput = input;
                        }}
                        secureTextEntry={true}
                        onSubmitEditing={() => {
                            this.confirmInput.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="lock-closed"
                        placeholder="CONFIRMAR SENHA"
                        style={styles.input}
                        secureTextEntry={true}
                        ref={(input) => {
                            this.confirmInput = input;
                        }}
                    />

                    <FlatButton
                        style={styles.button}
                        onPress={this.handleLogin}
                        label="CADASTRAR"
                        onPress={() => {}}
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
        marginBottom: 35,
    },
    input: {
        marginTop: 12,
    },
    button: {
        marginTop: 50,
    },
});
