import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

export default class About extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.view]}>
                <Text>About</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
    },
});
