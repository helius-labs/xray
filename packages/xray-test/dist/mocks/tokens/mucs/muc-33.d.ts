declare const _default: {
    account: string;
    legacyMetadata: null;
    offChainMetadata: {
        error: string;
        metadata: {
            attributes: {
                traitType: string;
                value: string;
            }[];
            description: string;
            image: string;
            name: string;
            properties: {
                category: null;
                creators: null;
                files: {
                    type: string;
                    uri: string;
                }[];
            };
            sellerFeeBasisPoints: number;
            symbol: string;
        };
        uri: string;
    };
    onChainAccountInfo: {
        accountInfo: {
            data: {
                parsed: {
                    info: {
                        decimals: number;
                        freezeAuthority: string;
                        isInitialized: boolean;
                        mintAuthority: string;
                        supply: string;
                    };
                    type: string;
                };
                program: string;
                space: number;
            };
            executable: boolean;
            isSigner: boolean;
            isWritable: boolean;
            key: string;
            lamports: number;
            owner: string;
            rentEpoch: number;
        };
        error: string;
    };
    onChainMetadata: {
        error: string;
        metadata: {
            collection: {
                key: string;
                verified: boolean;
            };
            collectionDetails: null;
            data: {
                creators: {
                    address: string;
                    share: number;
                    verified: boolean;
                }[];
                name: string;
                sellerFeeBasisPoints: number;
                symbol: string;
                uri: string;
            };
            editionNonce: number;
            isMutable: boolean;
            key: string;
            mint: string;
            primarySaleHappened: boolean;
            tokenStandard: string;
            updateAuthority: string;
            uses: {
                remaining: number;
                total: number;
                useMethod: string;
            };
        };
    };
};
export default _default;
