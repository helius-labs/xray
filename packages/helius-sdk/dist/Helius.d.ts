import { Webhook, CreateWebhookRequest, EditWebhookRequest, CreateCollectionWebhookRequest, MintlistRequest, MintlistResponse } from "./types";
import { Connection, Cluster } from "@solana/web3.js";
import { RpcClient } from "./RpcClient";
/**
 * This is the base level class for interfacing with all Helius API methods.
 *
 * @class
 */
export declare class Helius {
    /**
     * API key generated at dev.helius.xyz
     *
     * @private
     */
    private apiKey;
    /** The cluster in which the connection endpoint belongs to */
    readonly cluster: Cluster;
    /** URL to the fullnode JSON RPC endpoint */
    readonly endpoint: string;
    /** The connection object from Solana's SDK */
    readonly connection: Connection;
    /** The beefed up rpc client object from Helius SDK */
    readonly rpc: RpcClient;
    /**
     * Initializes Helius API client with an API key
     *
     * @class
     * @param apiKey - API key generated at dev.helius.xyz
     */
    constructor(apiKey: string, cluster?: Cluster);
    /**
     * Retrieves a list of all webhooks associated with the current API key
     *
     * @returns {Promise<Webhook[]>} A promise that resolves to an array of
     *   webhook objects
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    getAllWebhooks(): Promise<Webhook[]>;
    /**
     * Retrieves a single webhook by its ID, associated with the current API key
     *
     * @param {string} webhookID - The ID of the webhook to retrieve
     * @returns {Promise<Webhook>} A promise that resolves to a webhook object
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    getWebhookByID(webhookID: string): Promise<Webhook>;
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
    createWebhook(createWebhookRequest: CreateWebhookRequest): Promise<Webhook>;
    /**
     * Deletes a webhook by its ID
     *
     * @param {string} webhookID - The ID of the webhook to delete
     * @returns {Promise<boolean>} A promise that resolves to true if the webhook
     *   was successfully deleted, or false otherwise
     * @throws {Error} If there is an error calling the webhooks endpoint or if
     *   the response contains an error
     */
    deleteWebhook(webhookID: string): Promise<boolean>;
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
    editWebhook(webhookID: string, editWebhookRequest: EditWebhookRequest): Promise<Webhook>;
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
    appendAddressesToWebhook(webhookID: string, newAccountAddresses: string[]): Promise<Webhook>;
    createCollectionWebhook(request: CreateCollectionWebhookRequest): Promise<Webhook>;
    getMintlist(request: MintlistRequest): Promise<MintlistResponse>;
}
