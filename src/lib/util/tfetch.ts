const jsonHeaders = {
    "Content-Type": "application/json",
};

async function fetchJson<T>(
    url: string,
    body?: any,
    options: RequestInit = {},
    throwErrors = false,
    defaultReturn: any = {}
): Promise<T> {
    return fetch(url, {
        ...options,
        body: JSON.stringify(body),
        headers: {
            ...jsonHeaders,
            ...options.headers,
        },
        method: body ? options.method || "POST" : "GET",
    })
        .then((res) => res.json())
        .catch((err) => {
            if (throwErrors) {
                throw err;
            }
            // eslint-disable-next-line no-console
            console.error(err);

            return defaultReturn;
        });
}

export default fetchJson;
