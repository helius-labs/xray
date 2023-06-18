interface ParsedDateTime {
    clockHours: number;
    day: number;
    hours: number;
    minutes: number;
    month: string;
    seconds: number;
    suffix: string;
    year: number;
    formatted: string;
}

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default (timestamp: number): ParsedDateTime => {
    const date = new Date(timestamp * 1000);

    const hours = date.getHours();

    const clockHours = ((hours + 11) % 12) + 1;

    const result: ParsedDateTime = {
        clockHours,
        day: date.getDate(),
        formatted: "",
        hours: date.getHours(),
        minutes: date.getMinutes(),
        month: months[date.getMonth()],
        seconds: date.getSeconds(),
        suffix: hours >= 12 ? "pm" : "am",
        year: date.getFullYear(),
    };

    result.formatted = `${clockHours}:${result.minutes < 10 ? "0" : ""}${
        result.minutes
    } ${result.suffix} ${result.month} ${result.day} '${String(
        result.year
    ).slice(-2)}`;

    return result;
};
