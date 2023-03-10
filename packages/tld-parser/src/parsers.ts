import {MainDomain} from './state/main-domain';
import {PublicKey, Connection} from '@solana/web3.js';
import {BN} from 'bn.js';
import {NameRecordHeader} from './state/name-record-header';
import {
    findMainDomain,
    findOwnedNameAccountsForUser,
    getHashedName,
    getNameAccountKeyWithBump,
    getNameOwner,
    getOriginNameAccountKey,
} from './utils';

export class TldParser {
    constructor(private readonly connection: Connection) {}

    /**
     * retrieves all nameAccounts for any user.
     *
     * @param userAccount user publickey or string
     */
    async getAllUserDomains(
        userAccount: PublicKey | string,
    ): Promise<PublicKey[]> {
        if (typeof userAccount == 'string') {
            userAccount = new PublicKey(userAccount);
        }
        const allDomains = await findOwnedNameAccountsForUser(
            this.connection,
            userAccount,
            undefined,
        );
        return allDomains;
    }

    /**
     * retrieves all nameaccounts for any user in a particular tld.
     *
     * @param userAccount user publickey or string
     * @param tld tld to be retrieved from
     */
    async getAllUserDomainsFromTld(
        userAccount: PublicKey | string,
        tld: string,
    ): Promise<PublicKey[]> {
        const tldName = '.' + tld;

        const nameOriginTldKey = await getOriginNameAccountKey();
        const parentHashedName = getHashedName(tldName);
        const [parentAccountKey] = getNameAccountKeyWithBump(
            parentHashedName,
            undefined,
            nameOriginTldKey,
        );
        if (typeof userAccount == 'string') {
            userAccount = new PublicKey(userAccount);
        }
        const allDomains = await findOwnedNameAccountsForUser(
            this.connection,
            userAccount,
            parentAccountKey,
        );
        return allDomains;
    }

    /**
     * retrieves owner of a particular Name Account from domain.tld.
     *
     * @param domainTld full string of domain and tld e.g. "miester.poor"
     */
    async getOwnerFromDomainTld(
        domainTld: string,
    ): Promise<PublicKey | undefined> {
        const domainTldSplit = domainTld.split('.');
        const domain = domainTldSplit[0];
        const tldName = '.' + domainTldSplit[1];

        const nameOriginTldKey = await getOriginNameAccountKey();
        const parentHashedName = getHashedName(tldName);
        const [parentAccountKey] = getNameAccountKeyWithBump(
            parentHashedName,
            undefined,
            nameOriginTldKey,
        );

        const domainHashedName = getHashedName(domain);
        const [domainAccountKey] = getNameAccountKeyWithBump(
            domainHashedName,
            undefined,
            parentAccountKey,
        );

        const nameOwner = await getNameOwner(this.connection, domainAccountKey);
        return nameOwner;
    }

    /**
     * retrieves domainTld data a domain from domain.tld.
     *
     * @param domainTld full string of domain and tld e.g. "miester.poor"
     */
    async getNameRecordFromDomainTld(
        domainTld: string,
    ): Promise<NameRecordHeader | undefined> {
        const domainTldSplit = domainTld.split('.');
        const domain = domainTldSplit[0];
        const tldName = '.' + domainTldSplit[1];

        const nameOriginTldKey = await getOriginNameAccountKey();
        const parentHashedName = getHashedName(tldName);
        const [parentAccountKey] = getNameAccountKeyWithBump(
            parentHashedName,
            undefined,
            nameOriginTldKey,
        );

        const domainHashedName = getHashedName(domain);
        const [domainAccountKey] = getNameAccountKeyWithBump(
            domainHashedName,
            undefined,
            parentAccountKey,
        );
        const nameRecord = await NameRecordHeader.fromAccountAddress(
            this.connection,
            domainAccountKey,
        );
        return nameRecord;
    }

    /**
     * retrieves tld from parent name via TldHouse account.
     *
     * @param parentAccount parent publickey or string
     */
    async getTldFromParentAccount(
        parentAccount: PublicKey | string,
    ): Promise<string> {
        if (typeof parentAccount == 'string') {
            parentAccount = new PublicKey(parentAccount);
        }
        const parentNameAccount = await NameRecordHeader.fromAccountAddress(
            this.connection,
            parentAccount,
        );

        const tldHouseData = await this.connection.getAccountInfo(
            parentNameAccount?.owner!,
        );
        const tldStart = 8 + 32 + 32 + 32;
        const tldBuffer = tldHouseData?.data?.subarray(tldStart);
        const nameLength = new BN(tldBuffer?.subarray(0, 4), 'le').toNumber();
        const tld = tldBuffer
            .subarray(4, 4 + nameLength)
            .toString()
            .replace(/\0.*$/g, '');
        return tld;
    }
    /**
     * retrieves domain from name account via tldParent account.
     *
     * @param nameAccount name publickey or string
     * @param parentAccountOwner parent Owner or string (TldHouse)
     */
    async reverseLookupNameAccount(
        nameAccount: PublicKey | string,
        parentAccountOwner: PublicKey | string,
    ): Promise<string> {
        if (typeof nameAccount == 'string') {
            nameAccount = new PublicKey(nameAccount);
        }
        if (typeof parentAccountOwner == 'string') {
            parentAccountOwner = new PublicKey(parentAccountOwner);
        }

        const reverseLookupHashedName = getHashedName(nameAccount.toString());
        const [reverseLookupAccount] = getNameAccountKeyWithBump(
            reverseLookupHashedName,
            parentAccountOwner,
            undefined,
        );

        const reverseLookUpResult = await NameRecordHeader.fromAccountAddress(
            this.connection,
            reverseLookupAccount,
        );
        const domain = reverseLookUpResult?.data?.toString();
        return domain;
    }
    /**
     * retrieves main domain name account and its domain tld from user address.
     *
     * @param userAddress user publickey or string
     */
    async getMainDomain(userAddress: PublicKey | string): Promise<MainDomain> {
        if (typeof userAddress == 'string') {
            userAddress = new PublicKey(userAddress);
        }

        const [mainDomainAddress] = findMainDomain(userAddress);
        const mainDomain = await MainDomain.fromAccountAddress(
            this.connection,
            mainDomainAddress,
        );
        return mainDomain;
    }
}
