export function getAPIUrl(path: string, isMainnet: boolean) {
    const baseUrl = isMainnet
        ? "https://api.helius.xyz"
        : "https://api-devnet.helius.xyz";
    return `${baseUrl}${path}`;
}
