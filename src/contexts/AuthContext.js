import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../config';
import * as auth from '../services/auth';
import { Alert } from 'react-native';

const AuthContext = React.createContext({ authenticated: false, token: '' });

export const AuthProvider = ({ children }) => {
    const [token, setToken] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadStorageData() {
            let storageToken;
            try {
                storageToken = await AsyncStorage.getItem(
                    config.asyncStorageKeys.token
                );
            } catch (e) {
                console.log(e);
            }

            if (storageToken) {
                setToken(storageToken);
                setLoading(false);
            } else if (!storageToken) {
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    async function login(cpf, senha) {
        const response = await auth.login(cpf, senha);

        if (!response.sucess) {
            Alert.alert('Ops', response.data.message);
            return;
        }

        setToken(response.token);

        await AsyncStorage.setItem(
            config.asyncStorageKeys.token,
            response.token
        );
    }

    function logout() {
        AsyncStorage.clear().then(() => {
            setToken(null);
        });
    }

    return (
        <AuthContext.Provider
            value={{ authenticated: !!token, token, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
