import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cart data
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Simple form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Handle input
  const handleChange = (e) => {
    setForm((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    // Order placed
    alert("Order placed");

    // Clear cart
    dispatch(clearCart());

    // Redirect to Home
    navigate("/");
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Name*
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </label>

        <label>
          Email*
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </label>

        <label>
          Address*
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full delivery address"
          ></textarea>
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Optional"
          />
        </label>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <p>
            <strong>Items:</strong> {Object.keys(cartItems).length}
          </p>

          <p>
            <strong>Total Amount:</strong> ₹{total}
          </p>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;