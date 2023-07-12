// utils for updating items in our state
export const setLoading = (fetchable, loading: boolean) =>
    fetchable?.update((state) => ({ ...state, loading }));

export const setError = (fetchable, error: string) =>
fetchable?.update((state) => ({ ...state, error }));

export const updateItem = (fetchable, data: Asset | Balance) =>
fetchable.update((state) => {
    const existing = state?.data?.get(data.id) || {};

    state.data.set(data.id, {
            ...existing,
            ...data,
        });

        return state;
    });