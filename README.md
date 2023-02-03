![](/doc/xray.png)

# Project X-Ray
An intuitive Solana transaction explorer powered by Helius.

### Tech Stack
Here are the runtimes, key tools, libraries, and resources used in this project.
- [Node](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [SvelteKit](https://kit.svelte.dev/)
- [TanStack Query](https://tanstack.com/query/latest/docs/svelte/overview)
- [Tailwind](https://tailwindcss.com/)
- [DaisyUI Components](https://daisyui.com/)

### APIs
Various APIs we use
- [Solana JSON RPC API Docs](https://docs.solana.com/api)
- [Helius API Docs](https://docs.helius.xyz/welcome/what-is-helius)
- [Birdeye API Docs](https://birdeye.so/api)

## Runbook
#### Setup Environment
In the root of the proejct, create a `.env` file with the values mentioned in `.env.template`.

#### Install
From the root of the proejct, run `npm install` the first time running the proejct to install dependencies. 

#### Dev
Start the dev server with `npm run dev`.

#### Build
Build for production with `npm run build`.

#### Preview/Serve Production Build
You can preview a production build just generated from the build command using `npm run preview`.

## State Management

State is primarily managed using Svelte Query. This library allows us to define bits of state that contain a Promise to fetch data and convinient ways to subscribe to the data. 

### Actions
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

### Queries
🔍 `./src/lib/state/actions`
Queries 

##### Example Query
`./src/lib/state/actions/my-thing.ts`
```js
export default async () => {
    const response = await fetch("my-thing");

    const { data } = await response.json();

    return data;
};
```