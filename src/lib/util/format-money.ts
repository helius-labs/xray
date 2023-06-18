export default (price: number = 0) =>
    price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
