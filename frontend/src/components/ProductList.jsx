import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import BASE_URL from "../api";

const CATEGORIES = ["All", "Electronics", "Fashion", "Mobiles", "Home"];

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setLoading(true);

    const url =
      selectedCategory === "All"
        ? `${BASE_URL}products/`
        : `${BASE_URL}products/?category=${selectedCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let finalData = [];

        if (Array.isArray(data)) {
          finalData = data;
        } else if (data && Array.isArray(data.results)) {
          finalData = data.results;
        }

        setProducts(finalData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading products...</h2>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="filter-buttons">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2 style={{ padding: "20px" }}>No products found</h2>
        )}
      </div>
    </div>
  );
}

export default ProductList;