export const formatKey = (key: string) =>
    key
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export const formatObject = (obj: any, indentLevel = 0): string => {
    const entries = Object.entries(obj).map(([key, value]) => {
        const formattedKey = formatKey(key);
        // Apply bold style to top-level keys
        const boldClass = indentLevel === 0 ? "font-bold" : "";
        const valueClass = indentLevel > 0 ? "text-green-600" : "";
        const formattedValue =
            typeof value === "object" && value !== null && !Array.isArray(value)
                ? formatObject(value, indentLevel + 1) // Recursively format nested objects
                : `<span class="${valueClass}">${value}</span>`;

        return `<div>${" ".repeat(
            indentLevel * 4
        )}<span class="${boldClass}">${formattedKey}${
            typeof value === "object" ? "" : ":"
        }</span> ${formattedValue}</div>`;
    });

    // Join all the entries with a new line for top-level properties
    return entries.join(indentLevel === 0 ? '<div class="my-2"></div>' : "");
};
