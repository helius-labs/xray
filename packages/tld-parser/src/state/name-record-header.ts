import {AccountInfo, Connection, PublicKey} from '@solana/web3.js';
import {BinaryReader, deserializeUnchecked, Schema} from 'borsh';

/**
 * Holds the data for the {@link NameRecordHeader} Account and provides de/serialization
 * functionality for that data
 */
export class NameRecordHeader {
    constructor(obj: {
        parentName: Uint8Array;
        owner: Uint8Array;
        nclass: Uint8Array;
        expiresAt: Uint8Array;
    }) {
        this.parentName = new PublicKey(obj.parentName);
        this.nclass = new PublicKey(obj.nclass);
        this.expiresAt = new Date(
            new BinaryReader(Buffer.from(obj.expiresAt)).readU64().toNumber() *
                1000,
        );
        this.isValid =
            new BinaryReader(Buffer.from(obj.expiresAt))
                .readU64()
                .toNumber() === 0
                ? true
                : this.expiresAt > new Date();
        this.owner = this.isValid ? new PublicKey(obj.owner) : undefined;
    }

    parentName: PublicKey;
    owner: PublicKey | undefined;
    nclass: PublicKey;
    expiresAt: Date;
    isValid: boolean;
    data: Buffer | undefined;

    static DISCRIMINATOR = [68, 72, 88, 44, 15, 167, 103, 243];
    static HASH_PREFIX = 'ALT Name Service';

    /**
     * NameRecordHeader Schema across all alt name service accounts
     */
    static schema: Schema = new Map([
        [
            NameRecordHeader,
            {
                kind: 'struct',
                fields: [
                    ['discriminator', [8]],
                    ['parentName', [32]],
                    ['owner', [32]],
                    ['nclass', [32]],
                    ['expiresAt', [8]],
                    ['padding', [88]],
                ],
            },
        ],
    ]);

    /**
     * Returns the minimum size of a {@link Buffer} holding the serialized data of
     * {@link NameRecordHeader}
     */
    static get byteSize() {
        return 8 + 32 + 32 + 32 + 8 + 88;
    }

    /**
     * Retrieves the account info from the provided address and deserializes
     * the {@link NameRecordHeader} from its data.
     */
    public static async fromAccountAddress(
        connection: Connection,
        nameAccountKey: PublicKey,
    ): Promise<NameRecordHeader | undefined> {
        const nameAccount = await connection.getAccountInfo(
            nameAccountKey,
            'confirmed',
        );
        if (!nameAccount) {
            return undefined;
        }

        const res: NameRecordHeader = deserializeUnchecked(
            this.schema,
            NameRecordHeader,
            nameAccount.data,
        );

        res.data = nameAccount.data?.subarray(this.byteSize);

        return res;
    }

    /**
     * Retrieves the account infos from the multiple name accounts
     * the {@link NameRecordHeader} from its data.
     */
    public static async fromMultipileAccountAddresses(
        connection: Connection,
        nameAccountKey: PublicKey[],
    ): Promise<NameRecordHeader[] | []> {
        let nameRecordAccountInfos = await connection.getMultipleAccountsInfo(
            nameAccountKey,
        );

        let nameRecords: NameRecordHeader[] = [];

        nameRecordAccountInfos.forEach(value => {
            if (!value) {
                nameRecords.push(undefined);
                return;
            }
            let nameRecordData = this.fromAccountInfo(value);
            if (!nameRecordData) {
                nameRecords.push(undefined);
                return;
            }
            nameRecords.push(nameRecordData);
        });

        return nameRecords;
    }

    /**
     * Retrieves the account info from the provided data and deserializes
     * the {@link NameRecordHeader} from its data.
     */
    public static fromAccountInfo(
        nameAccountAccountInfo: AccountInfo<Buffer>,
    ): NameRecordHeader {
        const res: NameRecordHeader = deserializeUnchecked(
            this.schema,
            NameRecordHeader,
            nameAccountAccountInfo.data,
        );
        res.data = nameAccountAccountInfo.data?.subarray(this.byteSize);
        return res;
    }

    /**
     * Returns a readable version of {@link NameRecordHeader} properties
     * and can be used to convert to JSON and/or logging
     */
    pretty() {
        const indexOf0 = this.data.indexOf(0x00);
        return {
            parentName: this.parentName.toBase58(),
            owner: this.owner?.toBase58(),
            nclass: this.nclass.toBase58(),
            expiresAt: this.expiresAt,
            isValid: this.isValid,
            data: this.isValid
                ? this.data.subarray(0, indexOf0).toString()
                : undefined,
        };
    }
}
