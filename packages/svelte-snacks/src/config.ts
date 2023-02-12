import pkg from "../package.json";

export const appName = pkg.name;

export const contextKey = `[${appName}-state}]`;
