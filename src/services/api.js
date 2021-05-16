import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

let token = '';
try {
    AsyncStorage.getItem(config.asyncStorageKeys.token)
        .then((value) => {
            token = value;
            api.defaults.headers.authorization = `Bearer ${token}`;
        })
        .catch((error) => {
            token = '';
        });
} catch (e) {
    console.log(e);
}

export default api;
