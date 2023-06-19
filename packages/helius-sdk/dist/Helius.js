import axios from "axios";
import { Connection } from "@solana/web3.js";
import { heliusClusterApiUrl } from "./utils";
import { RpcClient } from "./RpcClient";
const API_URL_V0 = "https://api.helius.xyz/v0";
const API_URL_V1 = "https://api.helius.xyz/v1";
/**
 * This is the base level class for interfacing with all Helius API methods.
 *
 * @class
 */
export class Helius {
    /**
     * Initializes Helius API client with an API key
     *
     * @class
     * @param apiKey - API key generated at dev.helius.xyz
     */
    constructor(apiKey, cluster = "mainnet-beta") {
        this.apiKey = apiKey;
        this.cluster = cluster;
        this.endpoint = heliusClusterApiUrl(apiKey, cluster);
        this.connection = new Connection(this.endpoint);
        this.rpc = new RpcClient(this.connection);
    }
    /**
     * Retrieves a list of all webhooks associated with the current API key
     *
     * @returns {Promise<Webhook[]>} A promise that resolves to an array of
     *   webhook objects
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    async getAllWebhooks() {
        try {
            const { data } = await axios.get(`${API_URL_V0}/webhooks?api-key=${this.apiKey}`);
            return data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error calling getWebhooks: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error calling getWebhooks: ${err}`);
            }
        }
    }
    /**
     * Retrieves a single webhook by its ID, associated with the current API key
     *
     * @param {string} webhookID - The ID of the webhook to retrieve
     * @returns {Promise<Webhook>} A promise that resolves to a webhook object
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    async getWebhookByID(webhookID) {
        try {
            const { data } = await axios.get(`${API_URL_V0}/webhooks/${webhookID}?api-key=${this.apiKey}`);
            return data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during getWebhookByID: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during getWebhookByID: ${err}`);
            }
        }
    }
    /**
     * Creates a new webhook with the provided request
     *
     * @param {CreateWebhookRequest} createWebhookRequest - The request object
     *   containing the webhook information
     * @returns {Promise<Webhook>} A promise that resolves to the created webhook
     *   object
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    async createWebhook(createWebhookRequest) {
        try {
            const { data } = await axios.post(`${API_URL_V0}/webhooks?api-key=${this.apiKey}`, { ...createWebhookRequest });
            return data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during createWebhook: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during createWebhook: ${err}`);
            }
        }
    }
    /**
     * Deletes a webhook by its ID
     *
     * @param {string} webhookID - The ID of the webhook to delete
     * @returns {Promise<boolean>} A promise that resolves to true if the webhook
     *   was successfully deleted, or false otherwise
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    async deleteWebhook(webhookID) {
        try {
            await axios.delete(`${API_URL_V0}/webhooks/${webhookID}?api-key=${this.apiKey}`);
            return true;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during deleteWebhook: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during deleteWebhook: ${err}`);
            }
        }
    }
    /**
     * Edits an existing webhook by its ID with the provided request
     *
     * @param {string} webhookID - The ID of the webhook to edit
     * @param {EditWebhookRequest} editWebhookRequest - The request object
     *   containing the webhook information
     * @returns {Promise<Webhook>} A promise that resolves to the edited webhook
     *   object
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    async editWebhook(webhookID, editWebhookRequest) {
        try {
            const webhook = await this.getWebhookByID(webhookID);
            const editRequest = {
                ...webhook,
                ...editWebhookRequest,
            };
            delete editRequest["webhookID"];
            delete editRequest["wallet"];
            const { data } = await axios.put(`${API_URL_V0}/webhooks/${webhookID}?api-key=${this.apiKey}`, editRequest);
            return data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during editWebhook: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during editWebhook: ${err}`);
            }
        }
    }
    /**
     * Appends an array of addresses to an existing webhook by its ID
     *
     * @param {string} webhookID - The ID of the webhook to edit
     * @param {string[]} newAccountAddresses - The array of addresses to be added
     *   to the webhook
     * @returns {Promise<Webhook>} A promise that resolves to the edited webhook
     *   object
     * @throws {Error} If there is an error calling the webhooks endpoint, if the
     *   response contains an error, or if the number of addresses exceeds 10,000
     */
    async appendAddressesToWebhook(webhookID, newAccountAddresses) {
        try {
            const webhook = await this.getWebhookByID(webhookID);
            const accountAddresses = webhook.accountAddresses.concat(newAccountAddresses);
            webhook.accountAddresses = accountAddresses;
            if (accountAddresses.length > 100000) {
                throw new Error(`a single webhook cannot contain more than 100,000 addresses`);
            }
            const editRequest = {
                ...webhook,
            };
            delete editRequest["webhookID"];
            delete editRequest["wallet"];
            const { data } = await axios.put(`${API_URL_V0}/webhooks/${webhookID}?api-key=${this.apiKey}`, editRequest);
            return data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during appendAddressesToWebhook: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during appendAddressesToWebhook: ${err}`);
            }
        }
    }
    async createCollectionWebhook(request) {
        if (request?.collectionQuery == undefined) {
            throw new Error(`must provide collectionQuery object.`);
        }
        const { firstVerifiedCreators, verifiedCollectionAddresses } = request.collectionQuery;
        if (firstVerifiedCreators != undefined &&
            verifiedCollectionAddresses != undefined) {
            throw new Error(`cannot provide both firstVerifiedCreators and verifiedCollectionAddresses. Please only provide one.`);
        }
        let mintlist = [];
        let query = {};
        if (firstVerifiedCreators != undefined) {
            query = { firstVerifiedCreators };
        }
        else {
            // must have used verifiedCollectionAddresses
            query = { verifiedCollectionAddresses };
        }
        try {
            let mints = await this.getMintlist({
                query,
                options: {
                    limit: 10000,
                },
            });
            mintlist.push(...mints.result);
            while (mints.paginationToken) {
                mints = await this.getMintlist({
                    query,
                    options: {
                        limit: 10000,
                        paginationToken: mints.paginationToken,
                    },
                });
                mintlist.push(...mints.result);
            }
            const { webhookURL, transactionTypes, authHeader, webhookType } = request;
            const payload = {
                webhookURL,
                accountAddresses: mintlist.map((x) => x.mint),
                transactionTypes,
            };
            if (authHeader) {
                payload["authHeader"] = authHeader;
            }
            if (webhookType) {
                payload["webhookType"] = webhookType;
            }
            return await this.createWebhook({ ...payload });
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during createCollectionWebhook: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during createCollectionWebhook: ${err}`);
            }
        }
    }
    async getMintlist(request) {
        if (request?.query == undefined) {
            throw new Error(`must provide query object.`);
        }
        const { firstVerifiedCreators, verifiedCollectionAddresses } = request.query;
        if (firstVerifiedCreators != undefined &&
            verifiedCollectionAddresses != undefined) {
            throw new Error(`cannot provide both firstVerifiedCreators and verifiedCollectionAddresses. Please only provide one.`);
        }
        try {
            const { data } = await axios.post(`${API_URL_V1}/mintlist?api-key=${this.apiKey}`, { ...request });
            return data;
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                throw new Error(`error during getMintlist: ${err.response?.data.error || err}`);
            }
            else {
                throw new Error(`error during getMintlist: ${err}`);
            }
        }
    }
}
