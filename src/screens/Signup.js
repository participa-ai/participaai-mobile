import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    SafeAreaView,
    Text,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as yup from 'yup';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import { processMessage } from '../utils/utils';

import * as autenticacaoService from '../services/autenticacao';

import FlatButton from '../components/FlatButton';
import FlatIconInput from '../components/FlatIconInput';
import Logo from '../components/Logo';

export default Signup = ({ navigation }) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const cpfInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);
    const confirmInput = React.useRef(null);

    function handleSignup(values) {
        setIsWaiting(true);

        autenticacaoService
            .cadastrar(values)
            .then((response) => {
                setIsWaiting(false);

                if (!response.success) {
                    const message = processMessage(response.data.message);

                    Alert.alert('', message);
                    return;
                }

                Alert.alert(
                    'Pronto!',
                    'Cadastro realizado com sucesso, entre no sistema com suas credenciais.'
                );
                navigation.popToTop();
            })
            .catch((error) => {
                setIsWaiting(false);
                Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
                console.error(error.message);
            });
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <Formik
                initialValues={signupInitialValues}
                validationSchema={signupSchema}
                onSubmit={(values, actions) => {
                    handleSignup(values);
                }}
            >
                {(formikProps) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={globalStyles.container}>
                            <Logo style={styles.logo} />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.nome &&
                                    formikProps.errors.nome}
                            </Text>
                            <FlatIconInput
                                iconFamily="Ionicons"
                                iconName="text"
                                placeholder="Nome"
                                style={styles.input}
                                onSubmitEditing={() => {
                                    cpfInput.current.focus();
                                }}
                                blurOnSubmit={false}
                                onChangeText={formikProps.handleChange('nome')}
                                value={formikProps.values.nome}
                                onBlur={formikProps.handleBlur('nome')}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.cpf &&
                                    formikProps.errors.cpf}
                            </Text>
                            <FlatIconInput
                                iconFamily="Ionicons"
                                iconName="person-circle"
                                placeholder="CPF"
                                keyboardType="numeric"
                                maskType="cpf"
                                style={styles.input}
                                ref={cpfInput}
                                onSubmitEditing={() => {
                                    emailInput.current.focus();
                                }}
                                blurOnSubmit={false}
                                onChangeText={formikProps.handleChange('cpf')}
                                value={formikProps.values.cpf}
                                onBlur={formikProps.handleBlur('cpf')}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.email &&
                                    formikProps.errors.email}
                            </Text>
                            <FlatIconInput
                                blurOnSubmit={false}
                                iconFamily="MaterialIcons"
                                iconName="alternate-email"
                                keyboardType="email-address"
                                onBlur={formikProps.handleBlur('email')}
                                onChangeText={formikProps.handleChange('email')}
                                onSubmitEditing={() => {
                                    passwordInput.current.focus();
                                }}
                                placeholder="E-Mail"
                                ref={emailInput}
                                style={styles.input}
                                value={formikProps.values.email}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.senha &&
                                    formikProps.errors.senha}
                            </Text>
                            <FlatIconInput
                                iconFamily="Ionicons"
                                iconName="lock-closed"
                                placeholder="Senha"
                                style={styles.input}
                                ref={passwordInput}
                                secureTextEntry={true}
                                onSubmitEditing={() => {
                                    confirmInput.current.focus();
                                }}
                                blurOnSubmit={false}
                                onChangeText={formikProps.handleChange('senha')}
                                value={formikProps.values.senha}
                                onBlur={formikProps.handleBlur('senha')}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.confirmarSenha &&
                                    formikProps.errors.confirmarSenha}
                            </Text>
                            <FlatIconInput
                                iconFamily="Ionicons"
                                iconName="lock-closed"
                                placeholder="Confirmar senha"
                                style={styles.input}
                                secureTextEntry={true}
                                ref={confirmInput}
                                onChangeText={formikProps.handleChange(
                                    'confirmarSenha'
                                )}
                                value={formikProps.values.confirmarSenha}
                                onBlur={formikProps.handleBlur(
                                    'confirmarSenha'
                                )}
                            />

                            <FlatButton
                                style={styles.button}
                                label="CADASTRAR"
                                isWaiting={isWaiting}
                                disabled={isWaiting}
                                onPress={formikProps.handleSubmit}
                            />
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                )}
            </Formik>
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
    scrollview: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logo: {
        marginTop: Dimensions.get('screen').height * 0.08,
        marginBottom: Dimensions.get('screen').height * 0.025,
    },
    input: {
        marginBottom: 5,
    },
    button: {
        marginTop: Dimensions.get('screen').height * 0.03,
    },
});

const signupInitialValues = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
};

const signupSchema = yup.object({
    nome: yup.string().required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório'),
    email: yup
        .string()
        .email('Email é inválido')
        .required('Email é obrigatório'),
    senha: yup
        .string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 caractéres'),
    confirmarSenha: yup
        .string()
        .required('Confirme sua senha')
        .oneOf([yup.ref('senha'), null], 'Senhas não correspondem'),
});
