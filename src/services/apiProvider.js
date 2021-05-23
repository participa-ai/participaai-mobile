import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

class ApiProvider {
    async getApi() {
        const api = axios.create({
            baseURL: config.apiBaseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let token = '';
        try {
            token = await AsyncStorage.getItem(config.asyncStorageKeys.token);
        } catch (e) {
            console.log(e);
        }
        api.defaults.headers.authorization = `Bearer ${token}`;

        return api;
    }
}

export default new ApiProvider();
