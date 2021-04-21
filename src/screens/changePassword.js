import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet } from 'react-native';

import { globalStyles } from '../styles/global';

export default class ChangePassword extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text>ChangePassword</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
