import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../config';
import * as autenticacaoService from '../services/autenticacao';
import { Alert } from 'react-native';

const AuthContext = React.createContext({ authenticated: false, token: '' });

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        async function loadStorageData() {
            let storageToken;
            try {
                storageToken = await AsyncStorage.getItem(
                    config.asyncStorageKeys.token
                );
            } catch (e) {
                console.error(e);
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
        let response;
        try {
            response = await autenticacaoService.login(cpf, senha);
        } catch (error) {
            Alert.alert('Ops', 'Falha ao comunicar com o servidor!');
            console.warn(error.message);
            return false;
        }

        if (!response.success) {
            Alert.alert('Ops', response.data.message);
            return false;
        }

        if (response.data.token) {
            try {
                setToken(response.data.token);
                await AsyncStorage.setItem(
                    config.asyncStorageKeys.token,
                    response.data.token
                );
                return true;
            } catch (error) {
                console.error(error.message);
            }
        }
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
