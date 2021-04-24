import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class FlatButton extends React.Component {
    render() {
        const {
            label,
            textColor,
            backgroundColor,
            secondary,
            onPress,
        } = this.props;

        if (secondary)
            return (
                <TouchableOpacity
                    style={[{ backgroundColor }, styles.buttonSecondary]}
                    onPress={onPress}
                >
                    <Text style={[{ textColor }, styles.textSecondary]}>
                        {label}
                    </Text>
                </TouchableOpacity>
            );

        return (
            <TouchableOpacity
                style={[{ backgroundColor }, styles.button]}
                onPress={onPress}
            >
                <Text style={[{ textColor }, styles.text]}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FF5C46',
        padding: 10,
        borderRadius: 50,
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    buttonSecondary: {
        alignItems: 'center',
        backgroundColor: '#DCE2E3',
        padding: 10,
        borderRadius: 50,
    },
    textSecondary: {
        color: '#40738B',
        fontWeight: 'bold',
    },
});
