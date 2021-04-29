import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default ProblemCard = ({ label, onPress, style }) => {
    return (
        <View style={style}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        padding: 30,

        backgroundColor: colors.white,
        borderRadius: 25,
    },
    text: {
        color: colors.black,
        fontFamily: fonts.text,
        fontSize: 20,
    },
});
