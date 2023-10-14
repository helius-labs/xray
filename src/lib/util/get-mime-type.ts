const getMimeType = async (url: string) => {
    const response = await fetch(url, { method: "HEAD" });
    return response.headers.get("Content-Type");
};

export default getMimeType;
