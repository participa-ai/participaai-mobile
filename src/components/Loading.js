import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { globalStyles } from '../styles/global';

import loadAnimation from '../assets/images/loading.json';

export default function Loading() {
    return (
        <View style={globalStyles.container}>
            <LottieView
                source={loadAnimation}
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
        width: 200,
        height: 200,
    },
});
