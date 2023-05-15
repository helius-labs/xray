![https://xray.helius.xyz/](/doc/xray-cover-gh.jpg)

## Relevant Links

🔗 **Link**: https://xray.helius.xyz/

🎥 **Demo**: https://www.loom.com/share/402a4397ebd1403f8f4b7df8f024e9b8

🐤 **Twitter**: https://twitter.com/xray_explorer

💬 **Discord**: https://discord.gg/8Qxk7PmArt

## Support

-   📝 [Start Discussion](https://github.com/helius-labs/xray/discussions)
-   💡 [Submit Feature Request](https://github.com/helius-labs/xray/issues/new?assignees=&labels=question&template=FEATURE-REQUEST.yml&title=%F0%9F%92%A1+%5BREQUEST%5D+-+%3Ctitle%3E)
-   🐛 [Submit Bug Report](https://github.com/helius-labs/xray/issues/new?assignees=&labels=bug&template=BUG-REPORT.yml&title=%F0%9F%90%9B+%5BBUG%5D+-+%3Ctitle%3E)

## 🤝 Contribute

-   Fork XRAY onto your own GitHub
-   Clone it and make sure you're on the `dev` branch.
-   Create a new branch named `[initials]/[feature]` off of `dev`. Example `q/added-a-cool-thing`.

### Create PR

When you're ready for your changes to be reviewed, create a PR with your new branch to be merged into the `dev` branch on the official repo.

### Pro Tip (Draft PR)

If you're working on something and want to share the progress but aren't ready for merge, click the little arrow next to "Create PR" and chose "draft".

![draft](/doc/draft.png)

Then when you're ready to create the PR, click "Ready for review".

![ready](/doc/ready.png)

### Test

To save time, run tests locally, but they will also run on all PRs to `dev` and `main`. Tests will need to be passing for your changes to be merged.

### Auto merge `dev` -> `main`\*\*

Once changes are approved and merged into `dev`, they will be assumed as good and auto merged to `main`. From here they can be deployed by merging to either the `vercel/staging` or `vercel/prod` branches.

#### [Temp] Auto merge `main` -> `vercel/staging`

For now we are auto deploying everything in main to staging.

## 🏃🏽‍♂️ Runbook

This is a TurboRepo monorepo that can run and build all apps/packages in parallel. Apps like the UI are located in `/apps`. Packages used across apps are located in `/packages`.

### Reccomended VSCode Extensions

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
-   [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
-   [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

### Tech Stack

-   [Node](https://nodejs.org/en/)
-   [TurboRepo](https://turbo.build/repo)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Prisma](https://www.prisma.io/)
-   [tRPC](https://trpc.io/)
-   [SvelteKit](https://kit.svelte.dev/)
-   [TanstackQuery](https://tanstack.com/query/latest)
-   [SvelteKit tRPC SvelteQuery Adapter](https://github.com/vishalbalaji/trpc-svelte-query-adapter)
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

### Lint

It's reccomended you use VSCode beacuase if you do, ESLint is setup to auto fix/format as you're working.

```sh
npm run lint
```

### Format

Formats files based on the Prettier and ESlint settings.

```sh
npm run format
```

### Test

Tests the code, determines if it should be allowed to merge. We recommend running this locally before creating PRs.

```sh
npm run test
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

## 🚀 Deployments

| Environment | Description                                               | Directory                                              |
| ----------- | --------------------------------------------------------- | ------------------------------------------------------ |
| Production  | The main deployment attached to the domain. `vercel/prod` | https://xray.helius.xyz/                               |
| Staging     | Staging branch based on contents of `vercel/staging`      | https://xray-web-git-vercel-staging-helius.vercel.app/ |

## 📦 Packages

| Name                                                  | Description                                         | Directory                |
| ----------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| [@helius-labs/xray-web](#@helius-labs/xray-app)       | SvelteKit app with UI and backend endpoints.        | `apps/web`               |
| [@helius-labs/xray-proton](#@helius-labs/xray-proton) | Parses transaction data to produce UI state.        | `packages/xray-proton`   |
| `@helius-labs/xray-database` [WIP]                    | Prisma client used for communicating with database. | `packages/xray-database` |

# 📱 @helius-labs/xray-web

A SvelteKit app that contains the main XRAY UI.

## Important Files & Folders

|                           |                                                                                                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📁 `./src/lib`            | Common components, utilities, and libraries used throughout the app. Import things from this directory using the `$lib/` alias.                                                                             |
| 📁 `./src/lib/trpc`       | The tRPC server which has all of our backend endpoints. See `trpc/routes`.                                                                                                                                  |
| 📁 `./src/lib/components` | Shared components used throughout the app.                                                                                                                                                                  |
| 📁 `./src/lib/trpc`       | The tRPC server which has all of our backend endpoints.                                                                                                                                                     |
| 📁 `./src/lib/types`      | Global types                                                                                                                                                                                                |
| 📁 `./src/lib/configs`    | Config definitions for things like the icons, modals, and generating other types.                                                                                                                           |
| 📁`./src/routes`          | Any `+page` or `+server` file in this directory becomes a page or an endpoint based on the folder structure.                                                                                                |
| 📁`./static`              | A place to put any static assets. The files in this directory are hosted at the root of the domain. When using images, try to import them in the `<script>` vs put them in `./static` when you can help it. |
| 📄`./app.postcss`         | Initialize/config Tailwind + global styles.                                                                                                                                                                 |
| 📄`./app.html`            | The top level HTML template that wrapps all pages. Routes are injected into the `%sveltekit.body%` tag.                                                                                                     |

## Routes

|                    |                                                                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Home                                                                                                                                                                                               |
| `/api`             | REST endpoints (This is mostly replaces by tRPC now)                                                                                                                                               |
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

-   [TanstackQuery](https://tanstack.com/query/latest)
-   [SvelteKit tRPC SvelteQuery Adapter](https://github.com/vishalbalaji/trpc-svelte-query-adapter)

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

# 📦 @helius-labs/xray-database [WIP]

A database for savaing metadata like transaction views or user details.
