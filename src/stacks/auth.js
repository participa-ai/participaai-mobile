import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import BackArrow from '../assets/images/back-arrow.svg';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import Confirmation from '../screens/Confirmation';

const AuthStack = createStackNavigator();

export default AuthStacks = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={defaultScreenOptions}
        >
            <AuthStack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen name="Signup" component={Signup} />
            <AuthStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />
            <AuthStack.Screen name="Confirmation" component={Confirmation} />
        </AuthStack.Navigator>
    );
};

const defaultScreenOptions = {
    title: '',
    headerTintColor: colors.blue,
    headerBackImage: ({ tintColor }) => {
        return <BackArrow width={20} height={20} fill={tintColor} />;
    },
    headerStyle: {
        backgroundColor: colors.white,
    },
    headerTitleStyle: {
        fontFamily: fonts.heading,
    },
    headerLeftContainerStyle: {
        paddingLeft: 10,
    },
    headerTransparent: true,
};
