import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "$lib/xray";

const { HELIUS_API_KEY } = process.env;

import { Record, getRecord, NameRegistryState, getDomainKeySync } from "@bonfida/spl-name-service";


// This function takes in the data and the record type, converts urls to usernames and usernames to urls. Each record will be a website that hosts said username, need to make sure the url links out to the right place
function sanitiseData(data: string, record: String){
    // A helper function to clean out any text that has \x00\x00
    function cleanText(text: string){
        return text.replace(/\x00/g, "");
    }
    // Helper function to check whether it is a url or a username and then return the correct data
    function checkUrlOrUsername(text: string){
        // Check if it is a url
        if(text.includes("http")){
            // If it is a url then we need to extract the username from the url
            // Split the url by the / and then get the last element
            const url = text.split("/").pop();
            // Check if the url contains a ? and if it does then we need to remove the ? and everything after it
            if(url?.includes("?")){
                return url.split("?")[0];
            }
            return url;
        }
        return text;
    }
    // Cleane the data before passing it to the if statements
    data = cleanText(data);
    // Check if it is a url or a username
    
    if(record.toLowerCase() === "twitter"){
        // Return an object that contains the username and the url
        data = checkUrlOrUsername(data);
        return {username: data, url: `https://twitter.com/${data}`};
    }
    else if(record.toLowerCase() === "github"){
        data = checkUrlOrUsername(data);
        return {username: data, url: `https://github.com/${data}`};
    }
    else if(record.toLowerCase() === "telegram"){
        data = checkUrlOrUsername(data);
        return {username: data, url: `https://t.me/${data}`};
    }
    else if(record.toLowerCase() === "discord"){
        data = checkUrlOrUsername(data);
        return {username: data, url: `https://discord.com/users/${data}`};
    }
    else if(record.toLowerCase() === "email"){
        data = checkUrlOrUsername(data);
        return {username: data, url: `mailto:${data}`};
    }
    return {username: data, url: data};
}

export const profileFromDomainName = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        const connection = connect("mainnet", HELIUS_API_KEY);
        // Get the domain key
        // Step 1
        const { pubkey } = await getDomainKeySync(address + ".sol");

        // Step 2
        // The registry object contains all the info about the domain name
        // The NFT owner is of type PublicKey | undefined
        const { registry, nftOwner } = await NameRegistryState.retrieve(
        connection,
        pubkey
        );

        const domainContent = Buffer.from(registry.data).toString();
        // This is where we retrieve all the associated records for the domain
        const records = await Promise.all(
            Object.values(Record).map(async (record) => {
                try{
                    const recordData = await getRecord(connection, address + ".sol", record);
                    const returnedData = Buffer.from(recordData?.data).toString();
                    // Create an object with the record as the name and then an object with the returned data
                    return {record, returnedData: sanitiseData(returnedData, record)};
                }
                catch(e){
                    return {record, returnedData: undefined};
                }
            })
        );
        // Create an object that contains the content in the same format as the others and add it to the array
        records.push({record: "content", returnedData: sanitiseData(domainContent, "content")});
        return records;
    });

