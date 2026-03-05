import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import LoginModal from './LoginModal';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setPendingProduct(product);
      setShowLoginModal(true);
      return;
    }
    addToCart(product);
  };

  const handleLoginSuccess = (product) => {
    if (product) {
      addToCart(product);
    }
    setShowLoginModal(false);
    setPendingProduct(null);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setPendingProduct(null);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
      <Header />
      <div className="products-container" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 200px)', paddingBottom: '2rem' }}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ backgroundColor: '#ffffff', color: '#333333' }}
          />
        </div>

        <div className="products-grid" style={{ backgroundColor: '#ffffff' }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ backgroundColor: '#ffffff', color: '#333333', display: 'block' }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="product-image-container" style={{ backgroundColor: '#f8f8f8' }}>
                  <img src={product.image} alt={product.title} className="product-image" />
                </div>
                <div className="product-info" style={{ backgroundColor: '#ffffff' }}>
                  <h3 className="product-title" style={{ color: '#333333' }}>{product.title}</h3>
                  <p className="product-price" style={{ color: '#646cff' }}>${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products" style={{ color: '#666666' }}>
            <p>No products found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      <Footer />
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
        pendingProduct={pendingProduct}
      />
    </div>
  );
};

export default ProductList;

