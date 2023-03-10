var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey } from '@solana/web3.js';
import { BN } from 'bn.js';
import { createHash } from 'crypto';
import { ANS_PROGRAM_ID, MAIN_DOMAIN_PREFIX, ORIGIN_TLD, TLD_HOUSE_PROGRAM_ID, } from './constants';
import { NameRecordHeader } from './state/name-record-header';
/**
 * retrieves raw name account
 *
 * @param hashedName hashed name of the name account
 * @param nameClass defaults to pubkey::default()
 * @param parentName defaults to pubkey::default()
 */
export function getNameAccountKeyWithBump(hashedName, nameClass, parentName) {
    const seeds = [
        hashedName,
        nameClass ? nameClass.toBuffer() : Buffer.alloc(32),
        parentName ? parentName.toBuffer() : Buffer.alloc(32),
    ];
    return PublicKey.findProgramAddressSync(seeds, ANS_PROGRAM_ID);
}
/**
 * retrieves owner of the name account
 *
 * @param connection sol connection
 * @param nameAccountKey nameAccount to get owner of.
 */
export function getNameOwner(connection, nameAccountKey) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return (_a = (yield NameRecordHeader.fromAccountAddress(connection, nameAccountKey))) === null || _a === void 0 ? void 0 : _a.owner;
    });
}
/**
 * computes hashed name
 *
 * @param name any string or domain name.
 */
export function getHashedName(name) {
    const input = NameRecordHeader.HASH_PREFIX + name;
    const buffer = createHash('sha256').update(input, 'utf8').digest();
    return buffer;
}
/**
 * A constant in tld house.
 *
 * get origin name account should always equal to 3mX9b4AZaQehNoQGfckVcmgmA6bkBoFcbLj9RMmMyNcU
 *
 * @param originTld
 */
export function getOriginNameAccountKey(originTld = ORIGIN_TLD) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashed_name = getHashedName(originTld);
        const [nameAccountKey] = yield getNameAccountKeyWithBump(hashed_name, undefined, undefined);
        return nameAccountKey;
    });
}
/**
 * finds list of all name accounts for a particular user.
 *
 * @param connection sol connection
 * @param userAccount user's public key
 * @param parentAccount nameAccount's parentName
 */
export function findOwnedNameAccountsForUser(connection, userAccount, parentAccount) {
    return __awaiter(this, void 0, void 0, function* () {
        const filters = [
            {
                memcmp: {
                    offset: 40,
                    bytes: userAccount.toBase58(),
                },
            },
        ];
        if (parentAccount) {
            filters.push({
                memcmp: {
                    offset: 8,
                    bytes: parentAccount.toBase58(),
                },
            });
        }
        const accounts = yield connection.getProgramAccounts(ANS_PROGRAM_ID, {
            filters: filters,
        });
        return accounts.map((a) => a.pubkey);
    });
}
export function findMainDomain(user) {
    return PublicKey.findProgramAddressSync([Buffer.from(MAIN_DOMAIN_PREFIX), user.toBuffer()], TLD_HOUSE_PROGRAM_ID);
}
/**
 * finds list of all tld house accounts live.
 *
 * @param connection sol connection
 */
export function getAllTld(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        const tldHouseDiscriminator = [247, 144, 135, 1, 238, 173, 19, 249];
        const filters = [
            {
                memcmp: {
                    offset: 0,
                    bytes: tldHouseDiscriminator,
                },
            },
        ];
        const accounts = yield connection.getProgramAccounts(TLD_HOUSE_PROGRAM_ID, {
            filters: filters,
        });
        const tldsAndParentAccounts = [];
        accounts.map(({ account }) => {
            const parentAccount = getParentAccountFromTldHouseAccountInfo(account);
            const tld = getTldFromTldHouseAccountInfo(account);
            tldsAndParentAccounts.push({ tld, parentAccount });
        });
        return tldsAndParentAccounts;
    });
}
export function getTldFromTldHouseAccountInfo(tldHouseData) {
    var _a;
    const tldStart = 8 + 32 + 32 + 32;
    const tldBuffer = (_a = tldHouseData === null || tldHouseData === void 0 ? void 0 : tldHouseData.data) === null || _a === void 0 ? void 0 : _a.subarray(tldStart);
    const nameLength = new BN(tldBuffer === null || tldBuffer === void 0 ? void 0 : tldBuffer.subarray(0, 4), 'le').toNumber();
    return tldBuffer
        .subarray(4, 4 + nameLength)
        .toString()
        .replace(/\0.*$/g, '');
}
export function getParentAccountFromTldHouseAccountInfo(tldHouseData) {
    var _a;
    const parentAccountStart = 8 + 32 + 32;
    const parentAccountBuffer = (_a = tldHouseData === null || tldHouseData === void 0 ? void 0 : tldHouseData.data) === null || _a === void 0 ? void 0 : _a.subarray(parentAccountStart, parentAccountStart + 32);
    return new PublicKey(parentAccountBuffer);
}
/**
 * finds list of all domains in parent account from tld.
 *
 * @param connection sol connection
 * @param parentAccount nameAccount's parentName
 */
export function findAllDomainsForTld(connection, parentAccount) {
    return __awaiter(this, void 0, void 0, function* () {
        const filters = [
            {
                memcmp: {
                    offset: 8,
                    bytes: parentAccount.toBase58(),
                },
            },
        ];
        const accounts = yield connection.getProgramAccounts(ANS_PROGRAM_ID, {
            filters: filters,
        });
        return accounts.map((a) => a.pubkey);
    });
}
//# sourceMappingURL=utils.js.map