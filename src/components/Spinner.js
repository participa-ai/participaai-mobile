import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { globalStyles } from '../styles/global';

import spinnerAnimation from '../assets/images/spinner.json';

export default function Spinner() {
    return (
        <View style={globalStyles.container}>
            <LottieView
                source={spinnerAnimation}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    animation: {
        backgroundColor: 'transparent',
        width: 27,
        height: 27,
    },
});
