import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

export default Logo = ({ style }) => {
    return (
        <View style={style}>
            <Image
                style={styles.logo}
                source={require('../assets/images/participa-logo-64.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: Dimensions.get('screen').width * 0.75,
        height: 83,
        resizeMode: 'contain',
    },
});
