export default (timestamp: number) => {
    if (!timestamp) {
        return "";
    }

    const date =
        String(timestamp).length < 13
            ? new Date(timestamp * 1000)
            : new Date(timestamp);

    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${String(
        date.getFullYear()
    ).slice(-2)}`;

    const timeString = date.toLocaleTimeString();

    return `${timeString.slice(0, timeString.length - 6)} ${timeString.slice(
        -2
    )} ${dateString}`;
};
