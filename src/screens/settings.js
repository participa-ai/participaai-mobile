import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';
import AuthContext from '../contexts/auth';

export default class Settings extends Component {
    static contextType = AuthContext;

    handleAbout = () => {
        this.props.navigation.navigate('About');
    };

    handleLogout = () => {
        const { logout } = this.context;
        logout();
    };

    render() {
        const { token } = this.context;
        return (
            <View style={globalStyles.container}>
                <Text>Token: {token}</Text>
                <Button onPress={this.handleAbout} title="About" />
                <Button onPress={this.handleLogout} title="Sign out" />
            </View>
        );
    }
}

const styles = StyleSheet.create({});
