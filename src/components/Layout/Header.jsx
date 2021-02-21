import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = ({ cartItemsAmount }) => {
  return (
    <header className="navbar navbar-expand-lg d-flex justify-content-between bg-light ">
      <NavLink className="navbar-brand" to="/">
        Futuredeck
      </NavLink>
      <nav>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/:id">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/shop">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <div className="cart-items-ballon bg-primary">
              {cartItemsAmount}
            </div>
            <NavLink className="nav-link" to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
