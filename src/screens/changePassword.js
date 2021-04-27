import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FlatButton from '../components/flatButton';
import FlatIconInput from '../components/flatIconInput';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

export default class ChangePassword extends Component {
    render() {
        return (
            <View style={[globalStyles.container, styles.view]}>
                <ScrollView
                    contentContainerStyle={styles.scrollview}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="lock-closed"
                        placeholder="Senha atual"
                        style={styles.input}
                        ref={(input) => {
                            this.inputCurrentPassword = input;
                        }}
                        secureTextEntry={true}
                        onSubmitEditing={() => {
                            this.inputNewPassword.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="lock-closed"
                        placeholder="Nova senha"
                        style={styles.input}
                        ref={(input) => {
                            this.inputNewPassword = input;
                        }}
                        secureTextEntry={true}
                        onSubmitEditing={() => {
                            this.inputConfirm.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <FlatIconInput
                        iconFamily="Ionicons"
                        iconName="lock-closed"
                        placeholder="Confirmar nova senha"
                        style={styles.input}
                        secureTextEntry={true}
                        ref={(input) => {
                            this.inputConfirm = input;
                        }}
                    />

                    <FlatButton
                        style={styles.button}
                        onPress={this.handleLogin}
                        label="ALTERAR"
                        onPress={() => {}}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
    },
    scrollview: {
        marginTop: '35%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    input: {
        marginTop: 12,
    },
    button: {
        marginTop: 50,
    },
});
