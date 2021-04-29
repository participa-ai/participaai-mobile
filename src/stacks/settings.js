import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import BackArrow from '../assets/images/back-arrow.svg';
import ParticipaP from '../assets/images/participa-p.svg';

import Settings from '../screens/Settings';
import About from '../screens/About';
import ChangePassword from '../screens/ChangePassword';

const SettingsStack = createStackNavigator();

export default SettingsStacks = () => {
    return (
        <SettingsStack.Navigator
            initialRouteName="Settings"
            screenOptions={defaultScreenOptions}
        >
            <SettingsStack.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Configuração',
                    headerLeft: () => {
                        return (
                            <View style={styles.headerLeft}>
                                <ParticipaP width={30} height={30} />
                            </View>
                        );
                    },
                }}
            />
            <SettingsStack.Screen
                name="About"
                component={About}
                options={{
                    title: 'Sobre',
                }}
            />
            <SettingsStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    title: 'Alterar senha',
                }}
            />
        </SettingsStack.Navigator>
    );
};

const defaultScreenOptions = {
    headerTintColor: colors.black,
    headerBackImage: () => {
        return (
            <View style={styles.headerBackImage}>
                <BackArrow width={20} height={20} fill={colors.orange} />
                <ParticipaP width={30} height={30} />
            </View>
        );
    },
    headerRight: () => {
        return <View style={styles.headerLeft}></View>;
    },
    headerStyle: {
        backgroundColor: colors.white,
    },
    headerTitleStyle: {
        fontFamily: fonts.heading,
        fontSize: 24,
    },
    headerTitleContainerStyle: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.orange,
        padding: 11,
    },
    headerLeftContainerStyle: {
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.orange,
    },
    headerTransparent: true,
};

const styles = StyleSheet.create({
    headerLeft: {
        padding: 30,
    },
    headerBackImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
