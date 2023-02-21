export const rentTransferCheck = (amount: number) => {
    if (amount <= 4120320) {
        return true;
    }
    return false;
};
