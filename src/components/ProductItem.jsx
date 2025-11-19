import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProductItem({ product, onAdd }) {
  return (
    <div className="product-card" role="article">
      
      {/* Product image - clickable for detail page */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-img"
        />
      </Link>

      {/* Product title */}
      <h3>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>
      </h3>

      {/* Product price */}
      <p className="product-price">₹ {product.price}</p>

      {/* Add to cart button */}
      <button
        onClick={onAdd}
        className="add-btn"
        aria-label={`Add ${product.title} to cart`}
      >
        Add to Cart
      </button>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ProductItem;
