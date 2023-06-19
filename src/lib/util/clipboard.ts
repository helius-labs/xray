export const pasteFromClipboard = async () => {
    try {
        const text = await navigator.clipboard.readText();

        return text;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`ERROR`, error);
    }

    return "";
};

export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        // Fallback method using hidden textarea element
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }
};
