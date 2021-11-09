export const capitalize = (str) => {
    if(str == null || str.length == 0) return '';

    const cap = str.toUpperCase();

    return cap[0] + str.substring(1, str.length);
}