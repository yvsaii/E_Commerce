import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>NovaCart</h3>
          <p>Your one-stop shop for all your needs. Quality products at affordable prices.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="#footer">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul className="footer-links">
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>Email: support@novacart.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: Kphb Phase 2 Hyderabad, Telangana</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NovaCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

