# TLD Parser 

library to parse tld house domains via alternative name service (ANS) on the Solana Blockchain. 

- TLD Parser is in active development. 
- So all APIs are subject to change.

## Active Tlds

```
TLD     => parentAccountKey
.bonk   => 2j6gC6MMrnw4JJpAKR5FyyUFdxxvdZdG2sg4FrqfyWi5
.poor   => 8err4ThuTiZo9LbozHAvMrzXUmyPWj9urnMo38vC6FdQ
.abc    => 3pSeaEVTcKLkXPCpZHDpHUMWAogYFZgKSiVtyvqcgo8a
```

## Examples
current functions and how to use them. 

the library only works in mainnet. 

the devnet values are in constants.ts file

the example below is a replica of the tests in `tests` folder

```js
// constants
const RPC_URL = '';
const owner = new PublicKey("owner pubkey");
const tld = 'poor';
const domain = 'miester.poor';

// initialize
const connection = new Connection(RPC_URL);
const parser = new TldParser(connection);

// list of name record header publickeys owned by user
const ownerDomains = await parser.getAllUserDomains(owner); 
// ["6iE5btnTaan1eqfnwChLdVAyFERdn5uCVnp5GiXVg1aB"]

// list of name record header publickeys owned by user in a tld
const ownedTldDomains = await parser.getAllUserDomainsFromTld(owner, tld);
// ["6iE5btnTaan1eqfnwChLdVAyFERdn5uCVnp5GiXVg1aB"]

// retrieve owner of a particular domain
const owner = await parser.getOwnerFromDomainTld(domain);
// owner pubkey

// retrieve NameRecordHeader of a particular domain
const nameRecord = await parser.getNameRecordFromDomainTld(domain);
// a NameRecordHeader state
// if domain is expired, owner and data fields would be undefined

// retrieve tld of a particular domain Tld
const tldReceived = await parser.getTldFromParentAccount(nameRecord.parentName);
// .poor

// retrieve domain of a particular nameAccount with parentAccountOwner (TldHouse) in our case .poor
const parentNameRecord = await NameRecordHeader.fromAccountAddress(connection, nameRecord?.parentName);
const domain = await parser.reverseLookupNameAccount(nameAccount, parentNameRecord?.owner);
// miester

// retrieve dns from domains. works with different records
const recordPubkey = (await getDomainKey(Record.IPFS + "." + domain, true)).pubkey
const nameRecord = await NameRecordHeader.fromAccountAddress(recordPubkey);
// ipfs://...

const allTlds = await getAllTlds(connection);
// [{ 
//    tld: '.bonk',
//    parentAccount: "2j6gC6MMrnw4JJpAKR5FyyUFdxxvdZdG2sg4FrqfyWi5",
//  },
//  {
//    tld: '.poor',
//    parentAccount: "8err4ThuTiZo9LbozHAvMrzXUmyPWj9urnMo38vC6FdQ",
//  },
//  {
//    tld: '.abc',
//    parentAccount: "3pSeaEVTcKLkXPCpZHDpHUMWAogYFZgKSiVtyvqcgo8a",
// }]
```

## States
current state is the NameRecordHeader, it is the data retrieved from any ANS account.

the account structure:
- `parentName: PublicKey;`

parent is a name account that can have many children (name accounts)
- `owner: PublicKey | undefined;`

name account owner can be undefined if the name account has expired
- `nclass: PublicKey;`

name class is an account that holds an account state (Main domain, DNS, Subdomains) or can be Publickey.default
- `expiresAt: Date;`

the date by which the name account will expire. would be 0 if non expirable domains
- `isValid: boolean;`

only valid for expirable domains
- `data: Buffer | undefined;`

any data that is held by the name account