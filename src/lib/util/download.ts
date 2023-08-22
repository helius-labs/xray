export const downloadMedia = (url: string) => {
    let a = document.createElement("a");
    a.href = url;
    a.download = url.replace(/^.*[\\\/]/, "");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
