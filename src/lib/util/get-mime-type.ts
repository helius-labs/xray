const getMimeType = (filename: string): string | null => {
    const parts = filename.split(".");
    const extension = parts.length > 1 ? parts.pop()!.toLowerCase() : null;

    if (extension === "mp4") {
        return "video/mp4";
    } else if (extension === "webm") {
        return "video/webm";
    } else if (extension === "ogg") {
        return "video/ogg";
    } else if (extension === "mov") {
        return "video/quicktime";
    } else {
        return null;
    }
};

export default getMimeType;
