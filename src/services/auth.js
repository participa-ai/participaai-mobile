import api from './api';
import { resolve } from './resolve';

const authUrl = '/autenticacao';

export async function login(cpf, senha) {
    const body = JSON.stringify({
        cpf,
        senha,
    });

    return await resolve(api.post(`${authUrl}/login`, body));
}
