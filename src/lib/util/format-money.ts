export default (price: number = 0) =>
    price.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
    });
