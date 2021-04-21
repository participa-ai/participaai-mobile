import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { globalStyles } from '../styles/global';

export default class ForgotPassword extends Component {
  handleRequestRecovery = () => {
    this.props.navigation.navigate('RecoveryEmailSent');
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <Text>ForgotPassword</Text>
        <Button onPress={this.handleRequestRecovery} title="RequestRecovery" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
