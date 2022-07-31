export const numberFormat = (number) => {
    return (number || "")
        .toString()
        /* .replace(/^0|\./g, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") */;
}

export const priceFormat = (number) => {
    return number ? `$. ${numberFormat(number)}` : `$. 0`;
}

export const dateFormat = (date) => {
    const formatter = new Intl.DateTimeFormat('id', { dateStyle: 'short', timeStyle: 'short'});
    return formatter.format(date);
}