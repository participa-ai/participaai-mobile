import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import colors from '../styles/colors';

export default FlatButton = ({
    label,
    color,
    backgroundColor,
    secondary,
    onPress,
    style,
}) => (
    <View style={style}>
        <TouchableHighlight
            style={[
                { backgroundColor },
                secondary ? styles.buttonSecondary : styles.button,
            ]}
            underlayColor={
                secondary ? colors.backgroundShade : colors.orangeShade
            }
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
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.orange,
        padding: 14,
        borderRadius: 50,
        width: Dimensions.get('screen').width * 0.75,
    },
    text: {
        color: colors.white,
        fontFamily: 'roboto-bold',
        fontSize: 20,
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
    },
});
