import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 🔥 Fetch from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (item) => item.id === parseInt(id)
        );
        setProduct(found);
      });
  }, [id]);

  // 🔥 Add to Cart
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    alert("Product added to cart");
  };

  // 🔥 Buy Now
  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  const discount = Math.round(
    ((product.original_price - product.price) /
      product.original_price) *
      100
  );

  return (
    <div className="product-details">
      
      {/* LEFT IMAGE */}
      <div className="details-left">
        <img src={product.image} alt={product.name} />
      </div>

      {/* RIGHT SIDE */}
      <div className="details-right">
        <h2>{product.name}</h2>

        {/* ⭐ Stars */}
        <div className="rating-stars">
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
        </div>

        <div className="review-count">
          {product.reviews.toLocaleString()} reviews
        </div>

        {/* 💰 Price */}
        <div className="price">
          <span className="current">₹{product.price}</span>
          <span className="original">
            ₹{product.original_price}
          </span>
          <span className="discount">{discount}% off</span>
        </div>

        {/* 📄 About */}
        <h3>About this item</h3>
        <p className="description">{product.description}</p>

        {/* Extra Info */}
        <p><strong>Category:</strong> {product.category || "General"}</p>
        <p><strong>Rating:</strong> {product.rating} out of 5</p>

        {/* Buttons */}
        <div className="actions">
          <button className="btn-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="btn-buy" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {/* 🚚 Extra Section */}
        <div className="extra-info">
          <div>🚚 <strong>Free Delivery</strong><br />On orders over ₹499</div>
          <div>✓ <strong>Secure Payment</strong><br />100% secure transactions</div>
          <div>↩️ <strong>Easy Returns</strong><br />30-day return policy</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;