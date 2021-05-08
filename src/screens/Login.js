import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
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
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ cpf: '444.652.000-80', password: '123456' }}
                // validationSchema={loginSchema}
                onSubmit={(values, actions) => {
                    handleLogin(values);
                }}
            >
                {(formikProps) => (
                    <ScrollView
                        contentContainerStyle={styles.scrollview}
                        keyboardDismissMode="on-drag"
                        showsVerticalScrollIndicator={false}
                    >
                        <Logo style={styles.logo} />

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
                        {/* <Text style={globalStyles.errorText}>
                            {formikProps.touched.cpf && formikProps.errors.cpf}
                        </Text> */}

                        <FlatIconInput
                            iconFamily="Ionicons"
                            iconName="lock-closed"
                            placeholder="Senha"
                            style={styles.input}
                            ref={passwordInput}
                            secureTextEntry={true}
                            onChangeText={formikProps.handleChange('password')}
                            value={formikProps.values.password}
                            onBlur={formikProps.handleBlur('password')}
                        />
                        {/* <Text style={globalStyles.errorText}>
                            {formikProps.touched.password &&
                                formikProps.errors.password}
                        </Text> */}

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
                    </ScrollView>
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
        marginBottom: 75,
    },
    input: {
        marginTop: 25,
    },
    touch: {
        marginTop: 10,
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
    cpf: yup.string().required().label('CPF'),
    password: yup.string().required().label('Senha'),
});
