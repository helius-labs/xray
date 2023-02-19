export const rentTransferCheck = (amount: number) => {
    if (amount <= 2039280) {
        return true;
    }
    return false;
};
