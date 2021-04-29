import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { globalStyles } from '../styles/global';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { useAuth } from '../contexts/auth';
import FlatButton from '../components/flatButton';
import Logo from '../components/logo';
import FlatIconInput from '../components/flatIconInput';

export default Login = ({ navigation }) => {
    const { login } = useAuth();
    const passwordInput = React.useRef(null);

    const handleLogin = () => {
        login();
    };

    const handleForgot = () => {
        navigation.navigate('ForgotPassword');
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={globalStyles.container}>
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
                />

                <FlatIconInput
                    iconFamily="Ionicons"
                    iconName="lock-closed"
                    placeholder="Senha"
                    style={styles.input}
                    ref={passwordInput}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.touch} onPress={handleForgot}>
                    <Text style={styles.linkText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <FlatButton onPress={handleLogin} label="ENTRAR" />

                <Text style={styles.text}>OU</Text>

                <FlatButton
                    secondary
                    onPress={handleSignup}
                    label="CADASTRE-SE"
                    style={styles.button}
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
