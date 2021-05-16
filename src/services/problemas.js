import api from './api';
import { resolve } from './resolve';

const authUrl = '/problemas';

export async function listar() {
    return await resolve(api.get(`${authUrl}/meus-problemas`));
}

export async function cadastrar(formData) {
    const { categoria, descricao, localizacao } = formData;
    const body = JSON.stringify({
        categoria,
        descricao,
        localizacao,
    });

    return await resolve(api.post(`${authUrl}`, body));
}

export async function uploadFoto(formData) {
    return '';
}
