import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import BackArrow from '../assets/images/back-arrow.svg';
import ParticipaP from '../assets/images/participa-p.svg';

import Home from '../screens/Home';
import NewProblem from '../screens/NewProblem';
import CameraScreen from '../screens/CameraScreen';
import SearchAddress from '../screens/SearchAddress';
import AddressNumber from '../screens/AddressNumber';

const HomeStack = createStackNavigator();

export default HomeStacks = () => {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={defaultScreenOptions}
        >
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="NewProblem"
                component={NewProblem}
                options={{
                    title: 'Novo problema',
                }}
            />
            <HomeStack.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{
                    title: 'Tire uma foto do problema'
                }}
            />
            <HomeStack.Screen
                name="SearchAddress"
                component={SearchAddress}
                options={{
                    title: 'Procurar endereço'
                }}
            />
            <HomeStack.Screen
                name="AddressNumber"
                component={AddressNumber}
                options={{
                    title: 'Digite o número'
                }}
            />
        </HomeStack.Navigator>
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
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: colors.orange,
    },
    headerTitleStyle: {
        fontFamily: fonts.heading,
        fontSize: 24,
    },
    headerTitleContainerStyle: {
        padding: 11,
    },
    headerLeftContainerStyle: {
        paddingLeft: 0,
    },
    cardStyle: {
        backgroundColor: colors.background,
    },
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
