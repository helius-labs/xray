var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getHashedName, getNameAccountKeyWithBump, getOriginNameAccountKey, } from '.';
/**
 * This function can be used to compute the public key of a domain or subdomain and multi-level subdomain.
 * @param domainTld The domain to compute the public key for (e.g `vlad.poor`, `ipfs.miester.poor`, 'ipfs.super.miester.poor')
 * @returns
 */
export const getDomainKey = (domainTld, record = false) => __awaiter(void 0, void 0, void 0, function* () {
    const domainTldSplit = domainTld.split('.');
    if (domainTldSplit.length === 3) {
        // handles subdomains
        const tld = '.' + domainTldSplit[2];
        const domain = domainTldSplit[1];
        const subDomain = domainTldSplit[0];
        // parent key
        const { pubkey: parentKey } = yield _getNameAccount(tld);
        // domain key
        const { pubkey: domainKey } = yield _getNameAccount(domain, parentKey);
        // Sub domain
        const prefix = Buffer.from([record ? 1 : 0]).toString();
        const sub = prefix.concat(subDomain);
        const result = yield _getNameAccount(sub, domainKey);
        return Object.assign(Object.assign({}, result), { isSub: true, parent: domainKey });
    }
    else if (domainTldSplit.length === 4 && record) {
        // handles four-level subdomain
        const tld = '.' + domainTldSplit[3];
        const domain = domainTldSplit[2];
        const subDomain = domainTldSplit[1];
        const multiLevelSubDomain = domainTldSplit[0];
        // parent key
        const { pubkey: parentKey } = yield _getNameAccount(tld);
        // domain key
        const { pubkey: domainKey } = yield _getNameAccount(domain, parentKey);
        // Sub domain has to be added when we create subdomains for users which are not records
        const { pubkey: subKey } = yield _getNameAccount('\0'.concat(subDomain), domainKey);
        // Sub record
        const recordPrefix = Buffer.from([1]).toString();
        const result = yield _getNameAccount(recordPrefix.concat(multiLevelSubDomain), subKey);
        return Object.assign(Object.assign({}, result), { isSub: true, parent: domainKey, isSubRecord: true });
    }
    else if (domainTldSplit.length > 4) {
        throw new Error('Invalid derivation input');
    }
    // just a regular domainTld
    const tldName = '.' + domainTldSplit[1];
    const { pubkey: parentKeyDomainAccount } = yield _getNameAccount(tldName);
    const domain = domainTldSplit[0];
    const result = yield _getNameAccount(domain, parentKeyDomainAccount);
    return Object.assign(Object.assign({}, result), { isSub: false, parent: undefined });
});
const _getNameAccount = (name, parent) => __awaiter(void 0, void 0, void 0, function* () {
    if (!parent) {
        parent = yield getOriginNameAccountKey();
    }
    let hashed = getHashedName(name);
    let [pubkey] = yield getNameAccountKeyWithBump(hashed, undefined, parent);
    return { pubkey, hashed };
});
//# sourceMappingURL=name-record-handler.js.map