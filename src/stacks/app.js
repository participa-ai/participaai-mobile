import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/home';
import Problems from '../screens/problems';
import SettingsStacks from './settings';
import colors from '../styles/colors';

const AppBottomTab = createMaterialBottomTabNavigator();

export default class AppStacks extends Component {
    render() {
        return (
            <AppBottomTab.Navigator
                initialRouteName="Home"
                activeColor={colors.whiteShade}
                inactiveColor={colors.blueShade}
                backBehavior="initialRoute"
                barStyle={{ backgroundColor: colors.blue }}
            >
                <AppBottomTab.Screen
                    name="Problems"
                    component={Problems}
                    options={{
                        tabBarLabel: 'Problemas',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="format-list-bulleted"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <AppBottomTab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
                <AppBottomTab.Screen
                    name="SettingsStacks"
                    component={SettingsStacks}
                    tabBarLabel=""
                    options={{
                        tabBarLabel: 'Configuração',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="cog"
                                color={color}
                                size={26}
                            />
                        ),
                    }}
                />
            </AppBottomTab.Navigator>
        );
    }
}
