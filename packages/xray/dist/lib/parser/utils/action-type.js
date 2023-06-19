export const transferType = (transfer, address) => {
    if (transfer.fromUserAccount === address) {
        return "TRANSFER_SENT";
    }
    else if (transfer.toUserAccount === address) {
        return "TRANSFER_RECEIVED";
    }
    else {
        return "TRANSFER";
    }
};
