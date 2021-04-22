import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import Signup from '../screens/signup';
import ForgotPassword from '../screens/forgotPassword';
import RecoveryEmailSent from '../screens/recoveryEmailSent';

const AuthStack = createStackNavigator();

export default class AuthStacks extends Component {
    render() {
        return (
            <AuthStack.Navigator
                initialRouteName="Login"
                screenOptions={defaultScreenOptions}
            >
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="Signup" component={Signup} />
                <AuthStack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />
                <AuthStack.Screen
                    name="RecoveryEmailSent"
                    component={RecoveryEmailSent}
                />
            </AuthStack.Navigator>
        );
    }
}

const defaultScreenOptions = {
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: 'coral',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};
