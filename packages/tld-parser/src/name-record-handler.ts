import {PublicKey} from '@solana/web3.js';
import {
    getHashedName,
    getNameAccountKeyWithBump,
    getOriginNameAccountKey,
} from '.';

/**
 * This function can be used to compute the public key of a domain or subdomain and multi-level subdomain.
 * @param domainTld The domain to compute the public key for (e.g `vlad.poor`, `ipfs.miester.poor`, 'ipfs.super.miester.poor')
 * @returns
 */
export const getDomainKey = async (domainTld: string, record = false) => {
    const domainTldSplit = domainTld.split('.');
    if (domainTldSplit.length === 3) {
        // handles subdomains
        const tld = '.' + domainTldSplit[2];
        const domain = domainTldSplit[1];
        const subDomain = domainTldSplit[0];
        // parent key
        const {pubkey: parentKey} = await _getNameAccount(tld);
        // domain key
        const {pubkey: domainKey} = await _getNameAccount(domain, parentKey);
        // Sub domain
        const prefix = Buffer.from([record ? 1 : 0]).toString();
        const sub = prefix.concat(subDomain);
        const result = await _getNameAccount(sub, domainKey);
        return {...result, isSub: true, parent: domainKey};
    } else if (domainTldSplit.length === 4 && record) {
        // handles four-level subdomain
        const tld = '.' + domainTldSplit[3];
        const domain = domainTldSplit[2];
        const subDomain = domainTldSplit[1];
        const multiLevelSubDomain = domainTldSplit[0];
        // parent key
        const {pubkey: parentKey} = await _getNameAccount(tld);
        // domain key
        const {pubkey: domainKey} = await _getNameAccount(domain, parentKey);
        // Sub domain has to be added when we create subdomains for users which are not records
        const {pubkey: subKey} = await _getNameAccount(
            '\0'.concat(subDomain),
            domainKey,
        );
        // Sub record
        const recordPrefix = Buffer.from([1]).toString();
        const result = await _getNameAccount(
            recordPrefix.concat(multiLevelSubDomain),
            subKey,
        );
        return {...result, isSub: true, parent: domainKey, isSubRecord: true};
    } else if (domainTldSplit.length > 4) {
        throw new Error('Invalid derivation input');
    }
    // just a regular domainTld
    const tldName = '.' + domainTldSplit[1];
    const {pubkey: parentKeyDomainAccount} = await _getNameAccount(tldName);
    const domain = domainTldSplit[0];
    const result = await _getNameAccount(domain, parentKeyDomainAccount);
    return {...result, isSub: false, parent: undefined};
};

const _getNameAccount = async (name: string, parent?: PublicKey) => {
    if (!parent) {
        parent = await getOriginNameAccountKey();
    }
    let hashed = getHashedName(name);
    let [pubkey] = await getNameAccountKeyWithBump(hashed, undefined, parent);
    return {pubkey, hashed};
};
