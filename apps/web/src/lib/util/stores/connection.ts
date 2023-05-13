// A store for holding a connection instance for the frontend to use.
import { writable } from "svelte/store";
import { connect } from "@helius-labs/xray";
import type { Connection } from "@solana/web3.js";

const apiKey = import.meta.env.VITE_HELIUS_KEY;

export default writable<Connection>(connect("mainnet", apiKey));
