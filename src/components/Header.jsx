import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, selectSearchQuery } from "../redux/searchSlice";
import { selectCartCount } from "../redux/cartSlice";
import PropTypes from "prop-types";

function Header() {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="header">
      <nav className="nav">
        <h2 className="logo"><Link to="/">ShoppyGlobe</Link></h2>

        <div className="menu">
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            aria-label="Search products"
          />

          <Link to="/cart" className="cart-link">
            Cart ({cartCount})
          </Link>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  /* no props — using redux state */
};

export default Header;
