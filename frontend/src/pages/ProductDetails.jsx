import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BASE_URL from "../api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 🔥 Fetch from API
  useEffect(() => {
    fetch(`${BASE_URL}products/`)
      .then((res) => res.json())
      .then((data) => {
        let products = [];

        // ✅ handle paginated + normal response
        if (Array.isArray(data)) {
          products = data;
        } else if (data && Array.isArray(data.results)) {
          products = data.results;
        }

        const found = products.find(
          (item) => item.id === parseInt(id)
        );

        setProduct(found);
      })
      .catch((err) => console.error(err));
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

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  // ✅ safe discount
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) /
          product.original_price) *
          100
      )
    : 0;

  return (
    <div className="product-details">
      
      {/* LEFT IMAGE */}
      <div className="details-left">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
        />
      </div>

      {/* RIGHT */}
      <div className="details-right">
        <h2>{product.name}</h2>

        {/* ⭐ Rating */}
        <div className="rating-stars">
          {"★".repeat(Math.floor(product.rating || 0))}
          {"☆".repeat(5 - Math.floor(product.rating || 0))}
        </div>

        <div className="review-count">
          {(product.reviews || 0).toLocaleString()} reviews
        </div>

        {/* 💰 Price */}
        <div className="price">
          <span className="current">₹{product.price}</span>
          <span className="original">₹{product.original_price}</span>
          <span className="discount">{discount}% off</span>
        </div>

        {/* 📄 Description */}
        <h3>About this item</h3>
        <p className="description">
          {product.description || "No description available"}
        </p>

        <p><strong>Category:</strong> {product.category || "General"}</p>
        <p><strong>Rating:</strong> {product.rating || 0} / 5</p>

        {/* Buttons */}
        <div className="actions">
          <button className="btn-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <button className="btn-buy" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {/* Extra */}
        <div className="extra-info">
          <div>🚚 Free Delivery</div>
          <div>✓ Secure Payment</div>
          <div>↩️ Easy Returns</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;