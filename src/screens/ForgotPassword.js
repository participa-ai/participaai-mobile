import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    Alert,
    SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as yup from 'yup';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { processMessage } from '../utils/utils';

import * as autenticacaoService from '../services/autenticacao';

import FlatIconInput from '../components/FlatIconInput';
import Logo from '../components/Logo';
import FlatButton from '../components/FlatButton';

export default ForgotPassword = ({ navigation }) => {
    const [isWaiting, setIsWaiting] = useState(false);

    function handleRequestRecovery(values) {
        setIsWaiting(true);

        autenticacaoService
            .esqueciSenha(values)
            .then((response) => {
                setIsWaiting(false);

                if (!response.success) {
                    const message = processMessage(response.data.message);

                    Alert.alert('', message);
                    return;
                }

                navigation.navigate('Confirmation', {
                    text: 'Nós enviamos para o seu e-mail as instruções para trocar sua senha. Por favor, verifique seu e-mail!',
                    buttonText: 'Voltar',
                    navigateScreen: 'pop',
                });
            })
            .catch((error) => {
                setIsWaiting(false);
                Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
                console.error(error.message);
            });
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={globalStyles.container}
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <Logo style={styles.logo} />

                    <Text style={styles.text}>
                        Para alterar sua senha, digite abaixo o e-mail
                        cadastrado.
                    </Text>

                    <Text style={styles.text}>
                        Vamos te enviar as instruções para resetar sua senha.
                    </Text>

                    <Formik
                        initialValues={forgotPasswordInitialValues}
                        validationSchema={forgotPasswordSchema}
                        onSubmit={(values, actions) => {
                            handleRequestRecovery(values);
                        }}
                    >
                        {(formikProps) => (
                            <View>
                                <Text
                                    style={[
                                        globalStyles.errorText,
                                        styles.error,
                                    ]}
                                >
                                    {formikProps.touched.email &&
                                        formikProps.errors.email}
                                </Text>
                                <FlatIconInput
                                    blurOnSubmit={false}
                                    iconFamily="MaterialIcons"
                                    iconName="alternate-email"
                                    keyboardType="email-address"
                                    onBlur={formikProps.handleBlur('email')}
                                    onChangeText={formikProps.handleChange(
                                        'email'
                                    )}
                                    placeholder="E-Mail"
                                    style={styles.input}
                                    value={formikProps.values.email}
                                />

                                <FlatButton
                                    style={styles.button}
                                    label="Solicitar troca de senha"
                                    isWaiting={isWaiting}
                                    disabled={isWaiting}
                                    onPress={formikProps.handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </TouchableWithoutFeedback>
            <LinearGradient
                colors={[colors.white, colors.blue]}
                locations={[0.3, 1]}
                style={[
                    globalStyles.fixed,
                    globalStyles.fullscreen,
                    { zIndex: -1 },
                ]}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        marginBottom: Dimensions.get('screen').height * 0.08,
    },
    text: {
        fontFamily: fonts.text,
        fontSize: 20,
        textAlign: 'center',

        maxWidth: Dimensions.get('screen').width * 0.75,
        marginBottom: Dimensions.get('screen').height * 0.03,
    },
    error: {
        marginTop: Dimensions.get('screen').height * 0.01,
    },
    input: {
        marginBottom: Dimensions.get('screen').height * 0.03,
    },
    button: {},
});

const forgotPasswordInitialValues = {
    email: '',
};

const forgotPasswordSchema = yup.object({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
});
