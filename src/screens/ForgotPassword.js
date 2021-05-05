import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import FlatIconInput from '../components/FlatIconInput';
import Logo from '../components/Logo';
import FlatButton from '../components/FlatButton';

export default ForgotPassword = ({ navigation }) => {
    const handleRequestRecovery = () => {
        navigation.navigate('RecoveryEmailSent');
    };

    return (
        <View style={globalStyles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollview}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
            >
                <Logo style={styles.logo} />

                <Text style={styles.text}>
                    Para alterar sua senha, digite abaixo o e-mail cadastrado.
                </Text>

                <Text style={styles.text}>
                    Vamos te enviar as instruções para resetar sua senha.
                </Text>

                <FlatIconInput
                    iconFamily="MaterialIcons"
                    iconName="alternate-email"
                    placeholder="E-Mail"
                    style={styles.input}
                />

                <FlatButton
                    style={styles.button}
                    label="Solicitar troca de senha"
                    onPress={handleRequestRecovery}
                />
            </ScrollView>
            <LinearGradient
                colors={[colors.white, colors.blue]}
                locations={[0.3, 1]}
                style={[
                    globalStyles.fixed,
                    globalStyles.fullscreen,
                    { zIndex: -1 },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: '45%',
        marginBottom: 40,
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 20,
        textAlign: 'center',

        maxWidth: '90%',
        marginTop: 20,
    },
    input: {
        marginTop: 35,
    },
    button: {
        marginTop: 20,
    },
});