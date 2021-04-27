import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

import colors from '../styles/colors';

export default SettingsMenuItem = ({ label, onPress, style }) => {
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
        paddingTop: 30,
        paddingBottom: 5,
        width: Dimensions.get('window').width * 0.9,

        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#bbb',
    },
    text: {
        color: colors.black,
        fontFamily: 'roboto-regular',
        fontSize: 20,
    },
});
