export function dateFormatDDMMYYYY(date) {
    if (!date || !(date instanceof Date)) return '00/00/0000';

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(4, '0');

    return `${day}/${month}/${year}`;
}
