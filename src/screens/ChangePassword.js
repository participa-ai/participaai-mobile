import React, { useState } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    Text,
    Dimensions,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import colors from '../styles/colors';
import { globalStyles } from '../styles/global';
import { processMessage } from '../utils/utils';

import { useAuth } from '../contexts/AuthContext';
import * as autenticacaoService from '../services/autenticacao';

import FlatButton from '../components/FlatButton';
import FlatIconInput from '../components/FlatIconInput';

export default ChangePassword = () => {
    const [isWaiting, setIsWaiting] = useState(false);
    const inputNewPassword = React.useRef(null);
    const inputConfirm = React.useRef(null);
    const { logout } = useAuth();

    function handleChangePassword(values) {
        setIsWaiting(true);

        autenticacaoService
            .alterarSenha(values)
            .then((response) => {
                setIsWaiting(false);

                if (!response.success) {
                    const message = processMessage(response.data.message);

                    Alert.alert('', message);
                    return;
                }

                Alert.alert(
                    'Senha alterada',
                    'Por favor, faça o login novamente utilizando sua nova senha'
                );
                logout();
            })
            .catch((error) => {
                setIsWaiting(false);
                Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
                console.error(error.message);
            });
    }

    return (
        <SafeAreaView style={[globalStyles.container, styles.view]}>
            <ScrollView
                contentContainerStyle={styles.scrollview}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
            >
                <Formik
                    initialValues={changePasswordInitialValues}
                    validationSchema={changePasswordSchema}
                    onSubmit={(values, actions) => {
                        handleChangePassword(values);
                    }}
                >
                    {(formikProps) => (
                        <View>
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.senhaAtual &&
                                    formikProps.errors.senhaAtual}
                            </Text>
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
                                onChangeText={formikProps.handleChange(
                                    'senhaAtual'
                                )}
                                value={formikProps.values.senhaAtual}
                                onBlur={formikProps.handleBlur('senhaAtual')}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.senhaNova &&
                                    formikProps.errors.senhaNova}
                            </Text>
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
                                onChangeText={formikProps.handleChange(
                                    'senhaNova'
                                )}
                                value={formikProps.values.senhaNova}
                                onBlur={formikProps.handleBlur('senhaNova')}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.confirmarSenha &&
                                    formikProps.errors.confirmarSenha}
                            </Text>
                            <FlatIconInput
                                iconFamily="Ionicons"
                                iconName="lock-closed"
                                placeholder="Confirmar nova senha"
                                style={styles.input}
                                secureTextEntry={true}
                                ref={inputConfirm}
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
                                label="ALTERAR"
                                isWaiting={isWaiting}
                                disabled={isWaiting}
                                onPress={formikProps.handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.background,
    },
    scrollview: {
        marginTop: Dimensions.get('screen').height * 0.0385,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    input: {
        marginBottom: Dimensions.get('screen').height * 0.01,
    },
    button: {
        marginTop: Dimensions.get('screen').height * 0.045,
    },
});

const changePasswordInitialValues = {
    senhaAtual: '',
    senhaNova: '',
    confirmarSenha: '',
};

const changePasswordSchema = yup.object({
    senhaAtual: yup
        .string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 caractéres'),
    senhaNova: yup
        .string()
        .required('Nova senha é obrigatório')
        .min(6, 'Nova senha deve ter no mínimo 6 caractéres'),
    confirmarSenha: yup
        .string()
        .required('Confirme a nova senha')
        .oneOf([yup.ref('senhaNova'), null], 'Senhas não correspondem'),
});
