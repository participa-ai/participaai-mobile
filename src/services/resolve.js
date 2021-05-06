export async function resolve(promise) {
    let resolved = {
        sucess: false,
        metadata: {
            type: 'error',
        },
        data: null,
        error: null,
    };

    try {
        const response = await promise;

        resolved = response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            resolved = {
                status: error.response.status,
                ...error.response.data,
            };
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            resolved.data = {
                message: 'Não foi possível alcançar o servidor',
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            resolved.data = {
                message: 'Ops, algo deu errado!',
            };
        }
    }

    return resolved;
}
