import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    id,
    name = "Product",
    price = 0,
    original_price = 0,
    image = "",
    rating = 0,
    reviews = 0,
    badge,
  } = product || {};

  const discount = original_price
    ? Math.round(((original_price - price) / original_price) * 100)
    : 0;

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="product-card">
      {badge && (
        <span className="card-badge">
          {badge}
        </span>
      )}

      <Link to={`/product/${id}`} className="card-content">
        <div className="card-img-wrap">
          <img
            src={image || "https://via.placeholder.com/200"}
            alt={name}
            className="card-img"
          />
        </div>

        <div className="card-info">
          <h3>{name}</h3>

          <div>
            {[...Array(fullStars)].map((_, i) => (
              <span key={i}>★</span>
            ))}
            {hasHalf && <span>★</span>}
            {[...Array(emptyStars)].map((_, i) => (
              <span key={i}>☆</span>
            ))}
          </div>

          <p>₹{price}</p>
          <p style={{ textDecoration: "line-through" }}>₹{original_price}</p>
          <p>{discount}% off</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;