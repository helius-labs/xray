// Capitalize the first letter of each word in a string
export default (string: string = "") =>
    string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
