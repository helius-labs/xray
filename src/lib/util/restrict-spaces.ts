export const restrictSpaces = (e: any) => {
    if (!e) {
        return;
    } else if (e.key === " ") {
        e.preventDefault();
    }
};
