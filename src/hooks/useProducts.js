import { useState, useCallback } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError("");
    const controller = new AbortController();

    fetch("https://dummyjson.com/products", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => setProducts(data.products || []))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Unable to fetch products. Try again.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { products, loading, error, fetchProducts };
}

export default useProducts;