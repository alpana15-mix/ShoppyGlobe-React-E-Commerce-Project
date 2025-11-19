import PropTypes from "prop-types";

function CartItem({ product, qty, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <img src={product.thumbnail} alt={product.title} width={80} />
      <div>
        <h4>{product.title}</h4>
        <p>₹{product.price}</p>
        <div>
          <button onClick={onDecrease} aria-label="decrease">-</button>
          <span>{qty}</span>
          <button onClick={onIncrease} aria-label="increase">+</button>
        </div>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
  qty: PropTypes.number.isRequired,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  onRemove: PropTypes.func,
};

export default CartItem;
