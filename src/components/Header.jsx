import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, selectSearchQuery } from "../redux/searchSlice";
import { selectCartCount } from "../redux/cartSlice";
import PropTypes from "prop-types";
import { FaShoppingCart } from "react-icons/fa";  

function Header() {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="header">
      <nav className="nav">
        <h2 className="logo">
          <Link to="/">ShoppyGlobe</Link>
        </h2>

        <div className="menu">
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            aria-label="Search products"
          />

          <Link to="/cart" className="cart-link" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FaShoppingCart size={20} /> {/* <-- Cart icon */}
            <span>{cartCount}</span>      {/* <-- Count safe */}
          </Link>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {};

export default Header;
