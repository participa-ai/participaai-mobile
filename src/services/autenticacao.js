import apiProvider from './apiProvider';
import { resolve } from './resolve';

const authUrl = '/autenticacao';

export async function login(cpf, senha) {
    const api = await apiProvider.getApi();
    const body = JSON.stringify({
        cpf,
        senha,
    });

    return await resolve(api.post(`${authUrl}/login`, body));
}

export async function cadastrar(formData) {
    const api = await apiProvider.getApi();
    const { nome, cpf, email, senha } = formData;
    const body = JSON.stringify({
        nome,
        cpf,
        email,
        senha,
    });

    return await resolve(api.post(`${authUrl}/cadastro`, body));
}

export async function esqueciSenha(formData) {
    const api = await apiProvider.getApi();
    const { email } = formData;
    const body = JSON.stringify({
        email,
    });

    return await resolve(api.post(`${authUrl}/esqueci-senha`, body));
}

export async function alterarSenha(formData) {
    const api = await apiProvider.getApi();
    const { senhaAtual, senhaNova } = formData;
    const body = JSON.stringify({
        senhaAtual,
        senhaNova,
    });

    return await resolve(api.post(`${authUrl}/alterar-senha`, body));
}

export async function getEu() {
    const api = await apiProvider.getApi();
    return await resolve(api.get(`${authUrl}/eu`, body));
}
