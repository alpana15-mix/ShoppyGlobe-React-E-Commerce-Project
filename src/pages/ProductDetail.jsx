import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetail() {
  const { id } = useParams(); // dynamic id
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Fetch selected product details
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot fetch product");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch(() => setError("Failed to load product details"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail">
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        width={300}
      />

      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;