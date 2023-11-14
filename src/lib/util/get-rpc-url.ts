// Replace with the new version of Helius SDK once it's out
export function getRPCUrl(path: string, isMainnet: boolean = true) {
    const baseUrl = isMainnet
        ? "https://mainnet.helius-rpc.com"
        : "https://devnet.helius-rpc.com";
    return `${baseUrl}/${path}`;
}
