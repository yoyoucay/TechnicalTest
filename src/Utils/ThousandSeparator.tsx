export const addThousandSeparator = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeThousandSeparator = (formattedNumber: string) => {
    return formattedNumber.replace(/,/g, '');
};
