import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  // ✅ SAFE destructuring with defaults
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

  // ✅ Safe discount calculation
  const discount = original_price
    ? Math.round(((original_price - price) / original_price) * 100)
    : 0;

  // ✅ Safe star logic
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="product-card" id={`product-${id}`}>
      
      {/* Badge */}
      {badge && (
        <span
          className={`card-badge ${
            badge === "Deal" ? "badge-deal" : "badge-best"
          }`}
        >
          {badge}
        </span>
      )}

      {/* Image & Info */}
      <Link to={`/product/${id}`} className="card-content">

        {/* Image */}
        <div className="card-img-wrap">
          <img
            src={image || "https://via.placeholder.com/200"}
            alt={name}
            className="card-img"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="card-info">
          <h3 className="card-title">{name}</h3>

          {/* Rating */}
          <div className="card-rating">
            <div className="stars">
              {[...Array(fullStars)].map((_, i) => (
                <span key={`f${i}`} className="star filled">★</span>
              ))}

              {hasHalf && <span className="star half">★</span>}

              {[...Array(emptyStars)].map((_, i) => (
                <span key={`e${i}`} className="star empty">★</span>
              ))}
            </div>

            <span className="rating-count">
              ({reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="card-price-row">
            <span className="card-price">
              ₹{price.toLocaleString()}
            </span>

            <span className="card-original">
              ₹{original_price.toLocaleString()}
            </span>

            <span className="card-discount">
              {discount}% off
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;