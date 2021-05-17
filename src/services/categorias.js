import api from './api';
import { resolve } from './resolve';

const categoriesUrl = '/categorias';

export async function listar() {
    return await resolve(api.get(`${categoriesUrl}/`));
}
