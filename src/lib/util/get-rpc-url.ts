export function getRPCUrl(path: string, isMainnet: boolean = true) {
    const baseUrl = isMainnet
        ? "https://rpc.helius.xyz"
        : "https://devnet.helius-rpc.com";
    return `${baseUrl}/${path}`;
}
