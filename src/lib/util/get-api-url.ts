export function getAPIUrl(path: string, isMainnet: boolean) {
    const baseUrl = isMainnet
        ? "https://api-mainnet.helius-rpc.com"
        : "https://api-devnet.helius-rpc.com";
    return `${baseUrl}${path}`;
}
