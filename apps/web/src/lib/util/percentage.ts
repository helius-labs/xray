/** Converts metaplex sellerFeeBasisPoints to a "pretty" percentage based string */
export default (sellerFeeBasisPoints: number): string =>
    `${sellerFeeBasisPoints / 100}%`;
