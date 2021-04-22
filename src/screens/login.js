import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';
import AuthContext from '../contexts/auth';

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
                <Button onPress={this.handleLogin} title="Login" />
                <Button onPress={this.handleForgot} title="Esqueci" />
                <Button onPress={this.handleSignup} title="Cadastrar" />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
