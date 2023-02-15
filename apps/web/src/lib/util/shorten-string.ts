export default (address: string = "", size = 5): string =>
    `${address.slice(0, size)}...${address.slice(-size)}`;
