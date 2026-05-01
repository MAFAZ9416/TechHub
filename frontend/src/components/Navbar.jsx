import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔥 Load cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  // 👤 Load user
  const loadUser = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    updateCartCount();
    loadUser();

    // listen for cart & auth updates
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">TechHub</Link>
      </div>

      {/* CENTER */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {user ? (
          <div className="nav-user">
            <span className="nav-greeting">Hello, {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="nav-auth">
            <Link to="/login" className="nav-auth-link">Login</Link>
            <Link to="/register" className="nav-auth-link">Register</Link>
          </div>
        )}

        <Link to="/cart" className="cart-link">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;