export function shortenAddress(address: string) {
    if (!address) {
        return "";
    }
    const prefix = address.substring(0, 5); // first 5 characters
    const suffix = address.substring(address.length - 4);
    const format = `${prefix}..${suffix}`; // last 4 characters
    return format;
}
