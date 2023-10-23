/* eslint-disable no-console */
const getMimeType = async (url: string) => {
    try {
        const response = await fetch(url, { method: "HEAD" });
        if (!response.ok) {
            console.error(
                `Failed to fetch MIME type: ${response.status} ${response.statusText}`
            );
            return null;
        }
        return response.headers.get("Content-Type");
    } catch (error: any) {
        return null;
    }
};

export default getMimeType;
