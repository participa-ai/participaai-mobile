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

export async function cadastrar(usuario) {
    const { nome, cpf, email, senha } = usuario;
    const body = JSON.stringify({
        nome,
        cpf,
        email,
        senha,
    });

    return await resolve(api.post(`${authUrl}/cadastro`, body));
}

export async function getEu() {
    return await resolve(api.get(`${authUrl}/eu`, body));
}
