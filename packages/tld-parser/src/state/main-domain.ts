import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';

/**
 * Arguments used to create {@link MainDomain}
 * @category Accounts
 * @category generated
 */
export type MainDomainArgs = {
    nameAccount: web3.PublicKey;
    tld: string;
    domain: string;
};

export const mainDomainDiscriminator = [109, 239, 227, 199, 98, 226, 66, 175];
/**
 * Holds the data for the {@link MainDomain} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class MainDomain implements MainDomainArgs {
    private constructor(
        readonly nameAccount: web3.PublicKey,
        readonly tld: string,
        readonly domain: string,
    ) {}

    /**
     * Creates a {@link MainDomain} instance from the provided args.
     */
    static fromArgs(args: MainDomainArgs) {
        return new MainDomain(args.nameAccount, args.tld, args.domain);
    }

    /**
     * Deserializes the {@link MainDomain} from the data of the provided {@link web3.AccountInfo}.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static fromAccountInfo(
        accountInfo: web3.AccountInfo<Buffer>,
        offset = 0,
    ): [MainDomain, number] {
        return MainDomain.deserialize(accountInfo.data, offset);
    }

    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link MainDomain} from its data.
     *
     * @throws Error if no account info is found at the address or if deserialization fails
     */
    static async fromAccountAddress(
        connection: web3.Connection,
        address: web3.PublicKey,
        commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig,
    ): Promise<MainDomain> {
        const accountInfo = await connection.getAccountInfo(
            address,
            commitmentOrConfig,
        );
        if (accountInfo == null) {
            throw new Error(`Unable to find MainDomain account at ${address}`);
        }
        return MainDomain.fromAccountInfo(accountInfo, 0)[0];
    }

    /**
     * Provides a {@link web3.Connection.getProgramAccounts} config builder,
     * to fetch accounts matching filters that can be specified via that builder.
     *
     * @param programId - the program that owns the accounts we are filtering
     */
    static gpaBuilder(
        programId: web3.PublicKey = new web3.PublicKey(
            'TLDHkysf5pCnKsVA4gXpNvmy7psXLPEu4LAdDJthT9S',
        ),
    ) {
        return beetSolana.GpaBuilder.fromStruct(programId, mainDomainBeet);
    }

    /**
     * Deserializes the {@link MainDomain} from the provided data Buffer.
     * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
     */
    static deserialize(buf: Buffer, offset = 0): [MainDomain, number] {
        return mainDomainBeet.deserialize(buf, offset);
    }

    /**
     * Serializes the {@link MainDomain} into a Buffer.
     * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
     */
    serialize(): [Buffer, number] {
        return mainDomainBeet.serialize({
            accountDiscriminator: mainDomainDiscriminator,
            ...this,
        });
    }

    /**
     * Returns the byteSize of a {@link Buffer} holding the serialized data of
     * {@link MainDomain} for the provided args.
     *
     * @param args need to be provided since the byte size for this account
     * depends on them
     */
    static byteSize(args: MainDomainArgs) {
        const instance = MainDomain.fromArgs(args);
        return mainDomainBeet.toFixedFromValue({
            accountDiscriminator: mainDomainDiscriminator,
            ...instance,
        }).byteSize;
    }

    /**
     * Fetches the minimum balance needed to exempt an account holding
     * {@link MainDomain} data from rent
     *
     * @param args need to be provided since the byte size for this account
     * depends on them
     * @param connection used to retrieve the rent exemption information
     */
    static async getMinimumBalanceForRentExemption(
        args: MainDomainArgs,
        connection: web3.Connection,
        commitment?: web3.Commitment,
    ): Promise<number> {
        return connection.getMinimumBalanceForRentExemption(
            MainDomain.byteSize(args),
            commitment,
        );
    }

    /**
     * Returns a readable version of {@link MainDomain} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty() {
        return {
            nameAccount: this.nameAccount.toBase58(),
            tld: this.tld,
            domain: this.domain,
        };
    }
}

/**
 * @category Accounts
 * @category generated
 */
export const mainDomainBeet = new beet.FixableBeetStruct<
    MainDomain,
    MainDomainArgs & {
        accountDiscriminator: number[] /* size: 8 */;
    }
>(
    [
        ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
        ['nameAccount', beetSolana.publicKey],
        ['tld', beet.utf8String],
        ['domain', beet.utf8String],
    ],
    MainDomain.fromArgs,
    'MainDomain',
);
