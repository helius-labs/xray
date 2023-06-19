export const rentTransferCheck = (amount) => {
    if (amount <= 4120320) {
        return true;
    }
    return false;
};
