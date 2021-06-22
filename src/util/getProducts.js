function getProducts (id) {
    const { data: products, error } = useSWR("/api/products");
    return {
      user: products,
      isLoading: !error && !data,
      isError: error
    }
  }

  