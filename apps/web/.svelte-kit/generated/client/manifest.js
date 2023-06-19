export { matchers } from './matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')];

export const server_loads = [];

export const dictionary = {
	"/": [3],
	"/account/[account]": [4,[2]],
	"/account/[account]/concurrent-merkle-tree": [5,[2]],
	"/account/[account]/nfts": [6,[2]],
	"/account/[account]/tokens": [7,[2]],
	"/block/[slot]": [8],
	"/token/[token]": [9],
	"/tx/[tx]": [10]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};