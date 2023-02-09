![](/doc/xray.png)

# Project X-Ray
An intuitive Solana transaction explorer powered by Helius.

## 🚀 Deployments
| Environment | Description | Directory |
|-|-|-|
Production| The main deployment attached to the domain. | https://xray-web.vercel.app/ |

## 📦 Packages
| Name | Description | Directory |
|-|-|-|
[@helius-labs/xray-app](#@helius-labs/xray-app)| SvelteKit app with UI and backend endpoints. | `apps/web` |
`@helius-labs/xray-proton`| Parses transaction data to produce UI state.  | `packages/xray-proton` |
`@helius-labs/xray-database`| Prisma client used for communicating with database.  | `packages/xray-database` |

## 🏃🏽‍♂️ Runbook
This is a TurboRepo monorepo that can run and build all apps/packages in parallel. Apps like the UI are located in `/apps`. Packages used across apps are located in `/packages`.

#### Tech Stack
- [Node](https://nodejs.org/en/)
- [TurboRepo](https://turbo.build/repo)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind](https://tailwindcss.com/)
- [DaisyUI Components](https://daisyui.com/)

#### Setup Environment
In the root of the project, create a `.env` file with the values mentioned in `.env.template`.

#### Install
Run the install command from the root of the project to install dependencies for all apps and packages. 
```
npm install
```

#### Dev
Start all packages and apps in dev mode which watches for changes and adds your local environment.
```sh
npm run dev
```

#### Build
Build all apps and packages for production.
```sh
npm run build
```

#### Build Local Environment
Build all apps and packages for production using your `.env` file.
```sh
npm run build:env
```

# 📱 @helius-labs/xray-app
A SvelteKit app that contains the main X-Ray UI and various endpoints used for viewing blockchain data.

### Important Files & Folders
|||
|-|-|
📁 `./src/lib` | Common components, utilities, and libraries used throughout the app. Import things from this directory using the `$lib/` alias. |
📁`./src/routes` | Any `+page` or `+server` file in this directory becomes a page or an endpoint based on the folder structure. |
📁`./src/routes` | Any `+page` or `+server` file in this directory becomes a page or an endpoint based on the folder structure. |
📁`./static` | A place to put any static assets. The files in this directory are hosted at the root of the domain. When using images, try to import them in the `<script>` vs put them in `./static` when you can help it. |
📄`./app.postcss` | Initialize/config Tailwind + global styles. |
📄`./app.html` | The top level HTML template that wrapps all pages. Routes are injected into the  `%sveltekit.body%` tag. |

### Routes
|||
|-|-|
`/` | Home |
`/api` | REST endpoints |
`/[search]` | From the home page, users can navigate to `/anything` which attempts to resolve the search and then redirect them to `/[search]/tx`, `/[search]/wallet`, or `/[search]/token` based on the search. |
`/[search]/tx` | Details about a particular transaction where `[search]` is a transaction signature. |
`/[search]/wallet` | Details about a particular wallet where `[search]` is a public key. |
`/[search]/token` | Details about a particular token where `[search]` is a token mint address. |

### Styles
[TailwindCSS](https://tailwindcss.com/) is used for base utilies and [DaisyUI](https://daisyui.com/) contains helpful UI components.

### Icons
```js

```

### State Management
State is managed using a custom library located in `$lib/state`.

#### Queries
A query is a definition that contains an ID + some options on how to fetch data. This lib uses a combination of query definations and Svelte stores to create easy to load, subscribable and organized state. 

#### Provider
To access query state in components, your app needs to be wrapped with `<QueryProvider>` which provides state to any components underneath it.
```html
<script>
    import { QueryProvider } from "$lib/state";
</script>

<QueryProvider>
    <nav>...</nav>
    <main class="min-h-screen">
        ...
    </main>
</QueryProvider>
```

#### Use Queries
Using queries is as easy as importing them as a store and subscribing with Sveltes `$`.
```html
<script>
    import query from "$lib/state";

    const price = query("solana-price");
</script>

{#if $price.isLoading}
    Loading...
{:else if $price.isError}
    Error: {$price.error}
{:else if $price.hasFetched}
    Price: {$price.data}
{/if}
```

#### Register Queries
To fetch data, there needs to be a query for it. See registered queries in `$lib/state/queries`.
##### Add Query
1. Add a new key to the queries object with the ID you want to subcribe to your query with.
2. Supply a loader function which should be a function that returns a Promise. Whatever is resolved will become the query value.
3. Optional: Add a `formatter` function for the returned data to pass through. This should also be a function that returns a Promise.
3. Optional: `fetchOnFirstSubscription`, if your loader function doesn't require any arguments, you can supply this option which will fetch data as soon as a part of your app subscribes to the query store.
```js
import getSolanaPrice from "$lib/state/actions/get-solana-price";

import formatMoney from "$lib/util/format-money";

const queries:Queries = {
    "solana-price" : {
        loader                   : getSolanaPrice,
        formatter                : formatMoney,
        fetchOnFirstSubscription : true,
    },

    ...
}
```

#### Dynamic Queries
Pass data to your queries load function like so.
```html
<script>
    import query from "$lib/state";

    const transactions = query("solana-account-transactions");

    $: if($transactions?.load) {
        $transactions.load($page.params.search);
    }
</script>
```

#### Reloading Queries
You can access your loader function on any query store at `$myQuery.load()`. This makes it easy to reload a certain query throughout the app. Any components that are subscribed to the reloaded query will be updated.

# 📦 @helius/xray-database
A database for savaing anonymous data like trasaction views.

# 📦 @helius/proton
Used for parsing blockchain data and making it pretty for the UI.