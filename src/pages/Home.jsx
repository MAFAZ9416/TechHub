import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  // 🔥 Fetch from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Take first 8 products
  const featured = products.slice(0, 8);

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to TechHub</h1>
          <p className="hero-subtitle">
            Discover amazing deals on electronics, fashion, and more.
          </p>
          <Link to="/shop" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/shop" className="section-link">See all</Link>
        </div>

        <div className="product-grid">
          {featured.length > 0 ? (
            featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ padding: "20px" }}>Loading...</p>
          )}
        </div>
      </section>

      {/* CATEGORY */}
      <section className="section">
        <h2 className="section-title">Shop by Category</h2>

        <div className="category-grid">
          <Link to="/shop" className="category-card">🖥️ Electronics</Link>
          <Link to="/shop" className="category-card">👕 Fashion</Link>
          <Link to="/shop" className="category-card">🏠 Home</Link>
          <Link to="/shop" className="category-card">📱 Mobiles</Link>
        </div>
      </section>

    </div>
  );
}

export default Home;