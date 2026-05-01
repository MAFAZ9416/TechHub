import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import BASE_URL from "../api";
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}products/`)
      .then(res => res.json())
      .then(data => {
        let finalData = [];

        if (Array.isArray(data)) {
          finalData = data;
        } else if (data && Array.isArray(data.results)) {
          finalData = data.results;
        }

        setProducts(finalData);
      })
      .catch(err => console.error(err));
  }, []);

  const featured = products.slice(0, 8);

  return (
    <div className="home-page">

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