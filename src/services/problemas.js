import apiProvider from './apiProvider';
import { resolve } from './resolve';

const problemsUrl = '/problemas';

export async function listar() {
    const api = await apiProvider.getApi();
    return await resolve(api.get(`${problemsUrl}/meus-problemas`));
}

export async function cadastrar(formData) {
    const api = await apiProvider.getApi();
    const { categoria, descricao, localizacao } = formData;
    const body = JSON.stringify({
        categoria,
        descricao,
        localizacao,
    });

    return await resolve(api.post(`${problemsUrl}`, body));
}

export async function uploadFoto(problemaId, foto) {
    const api = await apiProvider.getApi();
    var data = new FormData();
    data.append('foto', foto);

    return await resolve(
        api.post(`${problemsUrl}/${problemaId}/upload-foto`, data)
    );
}
