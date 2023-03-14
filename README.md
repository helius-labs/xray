# XRAY
A human-readable Solana transaction explorer powered by Helius.

🔗 **Link**: https://xray.helius.xyz/

🎥 **Demo**: https://www.loom.com/share/402a4397ebd1403f8f4b7df8f024e9b8

## 💬 Support

-   https://twitter.com/xray_explorer
-   https://discord.gg/8Qxk7PmArt

## 🚀 Deployments

| Environment | Description                                 | Directory                    |
| ----------- | ------------------------------------------- | ---------------------------- |
| Production  | The main deployment attached to the domain. | https://xray.helius.xyz/ |

## 📦 Packages

| Name                                                  | Description                                         | Directory                |
| ----------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| [@helius-labs/xray-app](#@helius-labs/xray-app)       | SvelteKit app with UI and backend endpoints.        | `apps/web`               |
| [@helius-labs/xray-proton](#@helius-labs/xray-proton) | Parses transaction data to produce UI state.        | `packages/xray-proton`   |
| `@helius-labs/xray-database`                          | Prisma client used for communicating with database. | `packages/xray-database` |

## 🏃🏽‍♂️ Runbook

This is a TurboRepo monorepo that can run and build all apps/packages in parallel. Apps like the UI are located in `/apps`. Packages used across apps are located in `/packages`.

#### Tech Stack

-   [Node](https://nodejs.org/en/)
-   [TurboRepo](https://turbo.build/repo)
-   [Prisma](https://www.prisma.io/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [SvelteKit](https://kit.svelte.dev/)
-   [Tailwind](https://tailwindcss.com/)
-   [DaisyUI Components](https://daisyui.com/)

### Setup Environment

In the root of the project, create a `.env` file with the values mentioned in `.env.template`.

### Install

Run the install command from the root of the project to install dependencies for all apps and packages.

```
npm install
```

### Dev

Start all packages and apps in dev mode which watches for changes and adds your local environment.

```sh
npm run dev
```

### Build

Build all apps and packages for production.

```sh
npm run build
```

### Build Local Environment

Build all apps and packages for production using your `.env` file.

```sh
npm run build:env
```

# 📱 @helius-labs/xray-app

A SvelteKit app that contains the main XRAY UI.

## Important Files & Folders

|                   |                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📁 `./src/lib`    | Common components, utilities, and libraries used throughout the app. Import things from this directory using the `$lib/` alias.                                                                             |
| 📁`./src/routes`  | Any `+page` or `+server` file in this directory becomes a page or an endpoint based on the folder structure.                                                                                                |
| 📁`./src/routes`  | Any `+page` or `+server` file in this directory becomes a page or an endpoint based on the folder structure.                                                                                                |
| 📁`./static`      | A place to put any static assets. The files in this directory are hosted at the root of the domain. When using images, try to import them in the `<script>` vs put them in `./static` when you can help it. |
| 📄`./app.postcss` | Initialize/config Tailwind + global styles.                                                                                                                                                                 |
| 📄`./app.html`    | The top level HTML template that wrapps all pages. Routes are injected into the `%sveltekit.body%` tag.                                                                                                     |

## Routes

|                    |                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Home                                                                                                                                                                                               |
| `/api`             | REST endpoints                                                                                                                                                                                     |
| `/[search]`        | From the home page, users can navigate to `/anything` which attempts to resolve the search and then redirect them to `/[search]/tx`, `/[search]/wallet`, or `/[search]/token` based on the search. |
| `/[search]/tx`     | Details about a particular transaction where `[search]` is a transaction signature.                                                                                                                |
| `/[search]/wallet` | Details about a particular wallet where `[search]` is a public key.                                                                                                                                |
| `/[search]/token`  | Details about a particular token where `[search]` is a token mint address.                                                                                                                         |

## Vercel Config

|                 |                                                   |
| --------------- | ------------------------------------------------- |
| Build Command   | `cd ../.. && npx turbo run build --filter=web...` |
| Output Director | `apps/web/.svelte-kit`                            |
| Install Command | `npm install --prefix=../..`                      |

## Styles

[TailwindCSS](https://tailwindcss.com/) is used for base utilies and [DaisyUI](https://daisyui.com/) contains helpful UI components.

## Icons

See list of available icons in `$lib/config`.

### Use Icons

```js
<script>
    import Icon from "$lib/components/icon.svelte";
</script>

<Icon id="paper-plane">
```

### Add Icons

1. Find the icon you want on [IconMon](https://iconmonstr.com/). Most of these should render fine.
2. Click "Embed" -> "Inline" and copy only the `<path>`.
3. Add a new key to `$lib/config.ts` that is similar to the Icon Monsters name for the icon and add your `<path>`.

## State Management

WIP

# 📦 @helius-labs/proton

Used for parsing blockchain data and making it pretty for the UI.

## Important Files & Folders

|                            |                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------- |
| 📄`./index.ts`             | UI calls the function in this file to parse transactions                              |
| 📄`./src/types/index.ts`   | Contains the types, interfaces, and enums needed to understand to work on the parser. |
| 📁`./src/parsers`          | Contains all parser methods.                                                          |
| 📄`./src/parsers/index.ts` | Exports parser files in `./src/parsers`.                                              |
| 📁`./src/utils`            | Utility functions for parser functions                                                |

## General Work Flow When Adding a New Transaction Type

1. Identify a transaction type that is not currently supported.
    - [Helius API Docs](https://docs.helius.xyz/reference/transaction-types) - View all transaction types supported by Helius.
2. Get to know the transaction type. Here is the resource I personally like to use for it:
    - [SwaggerHub](https://app.swaggerhub.com/apis-docs/Helius/HeliusAPI/1.1.0#/Transactions/getEnrichedTransactions) - Use `/v0/addresses/{address}/transactions ` for addresses with the specific transaction type or `/v0/transactions/` for a transaction (also supports multiple transactions). I like downloading the JSON file and looking through it constantly. More transactions + edge cases are better to battle test your parser function.
3. Add a new file or edit an existing one in `./src/parsers`. (refer to other files for general structures of what a parser function should look like)
4. Export the function in `./src/parsers/index.ts`, add the transaction type to the `ProtonSupportedType` object in `./src/types/index.ts`, and add the transaction type with the corresponding parser function to the `protonParsers` object in `./src/types/index.ts`.
5. Work on the parser function while testing it since it is now compatible with the UI.

## Currently Supported Transactions

|                      |                            |
| -------------------- | -------------------------- |
| **Transaction Type** | **File in `/src/parsers`** |
| TRANSFER             | `/transfer.ts`             |
| SWAP                 | `/swap.ts`                 |
| BURN                 | `/burn.ts`                 |
| BURN_NFT             | `/burn.ts`                 |
| TOKEN_MINT           | `/token.ts`                |
| NFT_MINT             | `/nft.ts`                  |
| NFT_SALE             | `/nft.ts`                  |
| NFT_LISTING          | `/nft.ts`                  |
| NFT_CANCEL_LISTING   | `/nft.ts`                  |
| NFT_BID              | `/nft.ts`                  |
| NFT_BID_CANCELLED    | `/nft.ts`                  |
| BORROW_FOX           | `/fox.ts`                  |
| LOAN_FOX             | `/fox.ts`                  |
| UNKNOWN              | `/unknown.ts`              |

# 📦 @helius-labs/xray-database

A database for savaing anonymous data like trasaction views.
