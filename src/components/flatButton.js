import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

import colors from '../styles/colors';

export default class FlatButton extends Component {
    render() {
        const {
            label,
            color,
            backgroundColor,
            secondary,
            onPress,
            style,
        } = this.props;

        return (
            <View style={style}>
                <TouchableOpacity
                    style={[
                        { backgroundColor },
                        secondary ? styles.buttonSecondary : styles.button,
                    ]}
                    onPress={onPress}
                >
                    <Text
                        style={[
                            { color },
                            secondary ? styles.textSecondary : styles.text,
                        ]}
                    >
                        {label}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.orange,
        padding: 16,
        borderRadius: 50,
        width: Dimensions.get('screen').width * 0.75,
    },
    text: {
        color: colors.white,
        fontFamily: 'roboto-bold',
        fontSize: 20,
        textTransform: 'uppercase',
    },
    buttonSecondary: {
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 50,
        width: Dimensions.get('screen').width * 0.75,
    },
    textSecondary: {
        color: colors.blue,
        fontFamily: 'roboto-bold',
        fontSize: 20,
        textTransform: 'uppercase',
    },
});
