import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import FlatButton from '../components/FlatButton';
import Logo from '../components/Logo';

export default Confirmation = ({ navigation, route }) => {
    const { text, buttonText, navigateScreen } = route.params;

    const handleButtonPress = () => {
        if (navigateScreen === 'pop') {
            navigation.popToTop();
        } else {
            navigation.navigate(navigateScreen);
        }
    };

    return (
        <View style={globalStyles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollview}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
            >
                <Logo style={styles.logo} />

                <Text style={styles.text}>{text}</Text>

                <FlatButton
                    style={styles.button}
                    label={buttonText}
                    onPress={handleButtonPress}
                />
            </ScrollView>
            <LinearGradient
                colors={[colors.white, colors.blue]}
                locations={[0.3, 1]}
                style={[
                    globalStyles.fixed,
                    globalStyles.fullscreen,
                    { zIndex: -1 },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: '45%',
        marginBottom: 50,
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 20,
        textAlign: 'center',

        maxWidth: '90%',
        paddingTop: 35,
    },
    button: {
        marginTop: 95,
        paddingBottom: 10,
    },
});
