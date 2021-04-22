import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

export default class About extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>About</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
