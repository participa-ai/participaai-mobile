import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as yup from 'yup';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { useAuth } from '../contexts/AuthContext';
import FlatButton from '../components/FlatButton';
import Logo from '../components/Logo';
import FlatIconInput from '../components/FlatIconInput';

export default Login = ({ navigation }) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const { login } = useAuth();
    const passwordInput = React.useRef(null);

    const handleLogin = async (loginInfo) => {
        setIsWaiting(true);
        if (!(await login(loginInfo.cpf, loginInfo.password)))
            setIsWaiting(false);
    };

    const handleForgot = () => {
        navigation.navigate('ForgotPassword');
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <Formik
                initialValues={{ cpf: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={(values, actions) => {
                    handleLogin(values);
                }}
            >
                {(formikProps) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView style={globalStyles.container}>
                            <Logo style={styles.logo} />

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
                                onSubmitEditing={() => {
                                    passwordInput.current.focus();
                                }}
                                blurOnSubmit={false}
                                onChangeText={formikProps.handleChange('cpf')}
                                value={formikProps.values.cpf}
                                onBlur={formikProps.handleBlur('cpf')}
                            />

                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.password &&
                                    formikProps.errors.password}
                            </Text>
                            <FlatIconInput
                                iconFamily="Ionicons"
                                iconName="lock-closed"
                                placeholder="Senha"
                                style={styles.input}
                                ref={passwordInput}
                                secureTextEntry={true}
                                onChangeText={formikProps.handleChange(
                                    'password'
                                )}
                                value={formikProps.values.password}
                                onBlur={formikProps.handleBlur('password')}
                            />

                            <TouchableOpacity
                                style={styles.touch}
                                onPress={handleForgot}
                            >
                                <Text style={styles.linkText}>
                                    Esqueceu sua senha?
                                </Text>
                            </TouchableOpacity>

                            <FlatButton
                                onPress={formikProps.handleSubmit}
                                label="ENTRAR"
                                isWaiting={isWaiting}
                                disabled={isWaiting}
                            />

                            <Text style={styles.text}>OU</Text>

                            <FlatButton
                                secondary
                                onPress={handleSignup}
                                label="CADASTRE-SE"
                                style={styles.button}
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
    logo: {
        marginTop: Dimensions.get('screen').height * 0.15,
        marginBottom: Dimensions.get('screen').height * 0.07,
    },
    input: {
        marginBottom: 15,
    },
    touch: {
        marginBottom: 40,
        padding: 5,
    },
    linkText: {
        marginBottom: 10,
        color: colors.orange,
        fontFamily: fonts.heading,
    },
    button: {
        paddingBottom: 20,
    },
    text: {
        marginVertical: 10,
        color: colors.white,
        fontFamily: fonts.heading,
        textTransform: 'uppercase',
    },
});

const loginSchema = yup.object({
    cpf: yup.string().required('CPF é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
});
