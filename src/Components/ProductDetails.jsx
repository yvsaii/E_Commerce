import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import LoginModal from './LoginModal';
import './ProductDetails.css';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!isLoggedIn) {
      setPendingProduct({ ...product, selectedSize });
      setShowLoginModal(true);
      return;
    }

    addToCart({ ...product, selectedSize });
    alert(`Added to cart!\n\nProduct: ${product.title}\nSize: ${selectedSize}\nPrice: $${product.price}`);
  };

  const handleLoginSuccess = (product) => {
    if (product) {
      addToCart(product);
      alert(`Added to cart!\n\nProduct: ${product.title}\nSize: ${product.selectedSize}\nPrice: $${product.price}`);
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
        <div className="product-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="product-not-found">
          <p>Product not found</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="product-details-container">
        <button onClick={() => navigate('/')} className="back-button">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>

        <div className="product-details">
          <div className="product-details-left">
            <img src={product.image} alt={product.title} className="product-detail-image" />
          </div>

          <div className="product-details-right">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="size-selector">
              <p className="size-label">Select Size:</p>
              <div className="size-buttons">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        </div>
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

export default ProductDetails;

