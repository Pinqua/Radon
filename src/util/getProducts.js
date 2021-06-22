import useSWR from "swr";

const getProducts = () => {
    const { data, error } = useSWR("/api/products");
    return {
        products: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default getProducts;
