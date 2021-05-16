export function dateFormatDDMMYYYY(date) {
    if (!date || !(date instanceof Date)) return '00/00/0000';

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(4, '0');

    return `${day}/${month}/${year}`;
}

export function processMessage(message) {
    if (message.includes('Valor duplicado encontrado:'))
        return processDuplicatedMessage(message);

    return message;
}

function processDuplicatedMessage(message) {
    let dado;

    if (message.includes('email')) dado = 'e-mail';
    if (message.includes('cpf')) dado = 'CPF';

    return `Já existe um registro cadastrado com esse ${dado}`;
}
