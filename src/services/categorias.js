import apiProvider from './apiProvider';
import { resolve } from './resolve';

const categoriesUrl = '/categorias';

export async function listar() {
    const api = await apiProvider.getApi();
    return await resolve(api.get(`${categoriesUrl}/`));
}
