import ProductList from '../components/ProductList';
import './Shop.css';

function Shop() {
  return (
    <div className="page shop-page">
      <div className="shop-header">
        <h1>Shop All Products</h1>
        <p>Browse our complete collection of products</p>
      </div>
      <ProductList />
    </div>
  );
}

export default Shop;
