import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

export default class Home extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
