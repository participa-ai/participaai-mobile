import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

export default class NewProblem extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text>NewProblem</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
