import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from './home';
import ProblemsStack from './problems';
import SettingsStacks from './settings';
import colors from '../styles/colors';

const AppBottomTab = createMaterialBottomTabNavigator();

export default AppStacks = () => {
    return (
        <AppBottomTab.Navigator
            initialRouteName="HomeStack"
            activeColor={colors.whiteShade}
            inactiveColor={colors.blueShade}
            backBehavior="history"
            barStyle={{ backgroundColor: colors.blue }}
        >
            <AppBottomTab.Screen
                name="HomeStack"
                component={HomeStack}
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
                name="ProblemsStack"
                component={ProblemsStack}
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
};
