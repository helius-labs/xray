export const pasteFromClipboard = async () => {
    try {
        const text = await navigator.clipboard.readText();

        console.log({ text });

        return text;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`ERROR`, error);
    }

    return "";
};

export const copyToClipboard = async (text: string, copied = false) => {
    await navigator.clipboard.writeText(text);
};
