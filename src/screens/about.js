import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

export default About = () => {
    return (
        <View style={[globalStyles.container, styles.view]}>
            <Text>About</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
    },
});
