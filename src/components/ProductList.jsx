import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import { addToCart } from "../redux/cartSlice";
import { selectSearchQuery } from "../redux/searchSlice";
import ProductItem from "./ProductItem";

function ProductList() {
  const { products, loading, error, fetchProducts } = useProducts();
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  // Fetch data when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  // Filter products by search
  const filtered = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="product-list">
      {filtered.map((item) => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={() => dispatch(addToCart(item))}
        />
      ))}

      {filtered.length === 0 && <p>No matching product found.</p>}
    </div>
  );
}

export default ProductList;
