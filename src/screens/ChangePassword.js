import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FlatButton from '../components/FlatButton';
import FlatIconInput from '../components/FlatIconInput';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';

export default ChangePassword = () => {
    const inputNewPassword = React.useRef(null);
    const inputConfirm = React.useRef(null);

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
                    secureTextEntry={true}
                    onSubmitEditing={() => {
                        inputNewPassword.current.focus();
                    }}
                    blurOnSubmit={false}
                />

                <FlatIconInput
                    iconFamily="Ionicons"
                    iconName="lock-closed"
                    placeholder="Nova senha"
                    style={styles.input}
                    ref={inputNewPassword}
                    secureTextEntry={true}
                    onSubmitEditing={() => {
                        inputConfirm.current.focus();
                    }}
                    blurOnSubmit={false}
                />

                <FlatIconInput
                    iconFamily="Ionicons"
                    iconName="lock-closed"
                    placeholder="Confirmar nova senha"
                    style={styles.input}
                    secureTextEntry={true}
                    ref={inputConfirm}
                />

                <FlatButton
                    style={styles.button}
                    label="ALTERAR"
                    onPress={() => {}}
                />
            </ScrollView>
        </View>
    );
};

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
