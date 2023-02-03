![](/doc/xray.png)

# Project X-Ray
An intuitive Solana transaction explorer powered by Helius.

### 📜 Notion
Join this to view project task management and other related resources.
https://outgoing-stool-e96.notion.site/Project-XRAY-a9a36b39c97347f48689f6b111b6c958

### Tech Stack
Here are the runtimes, key tools, libraries, and resources used in this project.
- [Node](https://nodejs.org/en/)
- [TurboRepo](https://turbo.build/repo)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [SvelteKit](https://kit.svelte.dev/)
- [TanStack Query](https://tanstack.com/query/latest/docs/svelte/overview)
- [Tailwind](https://tailwindcss.com/)
- [DaisyUI Components](https://daisyui.com/)

### APIs
Various APIs we use.
- [Solana JSON RPC API Docs](https://docs.solana.com/api)
- [Helius API Docs](https://docs.helius.xyz/welcome/what-is-helius)
- [Birdeye API Docs](https://birdeye.so/api)

## 🏃🏽‍♂️ Runbook
This is a TurboRepo monorepo that can run and build all apps/packages in parallel. Apps like the UI are located in `/apps`. Packages used across apps are located in `/packages`.

#### Setup Environment
In the root of the proejct, create a `.env` file with the values mentioned in `.env.template`.

#### Install
From the root of the proejct, run `npm install` to install dependencies for all apps and packages. 

#### Dev
Start all packages and apps in dev mode with `npm run dev`. There are also more scripts in `package.json` of examples showing how to start a sigle app or package.

#### Build
Build all apps and packages for production with `npm run build`.
**Note:** If you want to build with your local `.env` try `npm run env -- npm run build`

# 📦 UI
## State Management

State is primarily managed using Svelte Query. This library allows us to define bits of state that contain a Promise to fetch data and convinient ways to subscribe to the data. 

### ⚡️ Actions
📂 `./src/lib/state/actions`


Actions are the Promises to fetch data often ran client side. These can reach out to 3rd parties directly or hit interal endpoints in order to proxy services that require authentication like Helius. 

##### Example Action
`./src/lib/state/actions/get-my-thing.ts`
```js
export default async () => {
    const response = await fetch("my-thing");

    const { data } = await response.json();

    return data;
};
```

### 🔍 Queries
📂 `./src/lib/state/actions` 


Create queries to easily fetch and subscribe to data.

##### Example Query
`./src/lib/state/actions/my-thing.ts`
```js
import { createQuery } from "@tanstack/svelte-query";

import getPrice from "$lib/state/actions/get-solana-price";

export default () => createQuery({
    queryKey : [ "solana-price" ],
    queryFn  : getPrice,
});
```

### 🪄 Using Queries
📂 `./src/lib/components/some-component`


The following pattern will subscribe to the data in the solanaPrice query store and update the page if it changes. The following will also fetch data for the first time if solanaPrice is empty.

##### Example Query
`./src/lib/state/actions/my-thing.ts`
```html
<script>
    import getSolanaPriceQuery from "$lib/state/queries/solana-price";

    const solanaPrice = getSolanaPriceQuery();
</script>

{#if $solanaPrice.isFetching}
    Loading...
{:else}
    <p>Price: {$solanaPrice}</p>
{/if}
```
# 📦 @helius/xray-databse
[wip]

# 📦 @helius/makeover
[wip]