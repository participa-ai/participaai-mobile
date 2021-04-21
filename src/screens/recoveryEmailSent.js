import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { globalStyles } from '../styles/global';

export default class RecoveryEmailSent extends Component {
  handleOk = () => {
    this.props.navigation.popToTop();
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <Text>RecoveryEmailSent</Text>
        <Button onPress={this.handleOk} title="handleOk" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
