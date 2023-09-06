export function calculatePrice(query: string): number {
    const length = query.length;

    if (length === 1) {
        return 750;
    }
    if (length === 2) {
        return 700;
    }
    if (length === 3) {
        return 640;
    }
    if (length === 4) {
        return 160;
    }
    if (length >= 5) {
        return 20;
    }
    return 0;
}
