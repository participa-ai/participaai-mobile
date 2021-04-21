import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../screens/settings';
import About from '../screens/about';

const SettingsStack = createStackNavigator();

export default class SettingsStacks extends Component {
  render() {
    return (
      <SettingsStack.Navigator
        initialRouteName="Settings"
        screenOptions={defaultScreenOptions}
      >
        <SettingsStack.Screen name="Settings" component={Settings} />
        <SettingsStack.Screen name="About" component={About} />
      </SettingsStack.Navigator>
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
