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
    token = AsyncStorage.getItem(config.asyncStorageKeys.token);
    api.defaults.headers.authorization = `Bearer ${token}`;
} catch (e) {
    console.log(e);
}

export default api;
