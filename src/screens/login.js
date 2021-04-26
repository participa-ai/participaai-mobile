import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import AuthContext from '../contexts/auth';
import FlatButton from '../components/flatButton';
import Logo from '../components/logo';
import FlatIconInput from '../components/flatIconInput';

export default class Login extends Component {
    static contextType = AuthContext;

    handleLogin = () => {
        const { login } = this.context;
        login();
    };

    handleForgot = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    handleSignup = () => {
        this.props.navigation.navigate('Signup');
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

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="person-circle"
                        placeholder="CPF"
                        keyboardType="numeric"
                        maskType="cpf"
                        style={styles.input}
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
                    />

                    <TouchableOpacity
                        style={styles.touch}
                        onPress={this.handleForgot}
                    >
                        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>

                    <FlatButton onPress={this.handleLogin} label="ENTRAR" />

                    <Text style={styles.text}>OU</Text>

                    <FlatButton
                        secondary
                        onPress={this.handleSignup}
                        label="CADASTRE-SE"
                        style={styles.button}
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
        marginBottom: 75,
    },
    input: {
        marginTop: 25,
    },
    touch: {
        marginTop: 10,
        marginBottom: 40,
        padding: 5,
    },
    linkText: {
        marginBottom: 10,
        color: colors.orange,
        fontFamily: 'roboto-bold',
    },
    button: {
        paddingBottom: 20,
    },
    text: {
        marginVertical: 10,
        color: colors.white,
        fontFamily: 'roboto-bold',
        textTransform: 'uppercase',
    },
});
