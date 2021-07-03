import useSWR from "swr";

const getProducts = (initialData) => {
    let res;
    if (initialData) {
        res = useSWR("/api/products", { initialData });
    } else {
        res = useSWR("/api/products");
    }
    return {
        products: res.data,
        isLoading: !res.error && !res.data,
        error: res.error,
    };
};

export default getProducts;
