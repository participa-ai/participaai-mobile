import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import BackArrow from '../assets/images/back-arrow.svg';
import ParticipaP from '../assets/images/participa-p.svg';

import Problems from '../screens/Problems';
import ProblemDetails from '../screens/ProblemDetails';
import ImageView from '../screens/ImageView';

const ProblemsStack = createStackNavigator();

export default ProblemsStacks = () => {
    return (
        <ProblemsStack.Navigator
            initialRouteName="Problems"
            screenOptions={defaultScreenOptions}
        >
            <ProblemsStack.Screen
                name="Problems"
                component={Problems}
                options={{
                    title: 'Problemas',
                    headerLeft: () => {
                        return (
                            <View style={styles.headerLeft}>
                                <ParticipaP width={30} height={30} />
                            </View>
                        );
                    },
                }}
            />
            <ProblemsStack.Screen
                name="ProblemDetails"
                component={ProblemDetails}
                options={{ headerShown: false }}
            />
            <ProblemsStack.Screen
                name="ImageView"
                component={ImageView}
                options={{ title: 'Foto' }}
            />
        </ProblemsStack.Navigator>
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
