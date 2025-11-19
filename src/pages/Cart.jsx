import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  increaseQty,
  decreaseQty
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartArray = Object.values(items);

  if (cartArray.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <Link to="/">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartArray.map(({ product, qty }) => (
        <div key={product.id} className="cart-item">
          <img src={product.thumbnail} width={80} alt={product.title} />

          <div className="cart-info">
            <h3>{product.title}</h3>
            <p>Price: ₹{product.price}</p>

            <div className="quantity-box">
              <button onClick={() => dispatch(decreaseQty(product.id))}>-</button>
              <span>{qty}</span>
              <button onClick={() => dispatch(increaseQty(product.id))}>+</button>
            </div>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(product.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <h3>Total Amount: ₹{total}</h3>
        <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
