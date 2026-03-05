import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './Home.css'

// Banner images from Unsplash
const bannerImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1600&h=600&fit=crop',
    title: 'Discover Amazing Products',
    subtitle: 'Shop the latest trends with up to 50% off'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop',
    title: 'Best Deals Every Day',
    subtitle: 'Unbeatable prices on premium items'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop',
    title: 'Premium Quality Products',
    subtitle: 'Carefully curated just for you'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop',
    title: 'Flash Sale - Up to 70% Off',
    subtitle: 'Limited time offers available now'
  }
]

// About section data
const aboutData = [
  {
    id: 1,
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your products delivered quickly with our express shipping options. Most orders delivered within 2-3 days.'
  },
  {
    id: 2,
    icon: '🔒',
    title: 'Secure Payments',
    description: 'Safe and trusted checkout with encrypted payment processing. Your security is our top priority.'
  },
  {
    id: 3,
    icon: '⭐',
    title: 'Quality Products',
    description: 'Carefully selected premium products that meet our high standards. 100% satisfaction guaranteed.'
  }
]

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Leather Backpack',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Portable Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
  }
]

// Customer reviews data
const reviewsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Amazing shopping experience! The products are high quality and delivery was super fast. Will definitely shop here again!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Best online store I have ever used. Great customer service and the products exceeded my expectations. Highly recommended!'
  },
  {
    id: 3,
    name: 'Emily Davis',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 4,
    text: 'Love the variety of products available. Found exactly what I was looking for at a great price. Fast shipping too!'
  }
]

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentReview, setCurrentReview] = useState(0)
  const productCardsRef = useRef([])

  // Auto-slide for banner
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 3500)
    return () => clearInterval(slideInterval)
  }, [])

  // Auto-slide for reviews
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviewsData.length)
    }, 5000)
    return () => clearInterval(reviewInterval)
  }, [])

  // Scroll animation observer for product cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    productCardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviewsData.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviewsData.length) % reviewsData.length)
  }

  return (
    <div>
      <Header />
      
      <main style={{ minHeight: '80vh' }}>
        {/* Hero Banner Slider */}
        <section className="hero-slider">
          {bannerImages.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="slide-overlay">
                <div className="slide-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <Link to="/products" className="shop-btn">Shop Now</Link>
                </div>
              </div>
            </div>
          ))}
          
          <button className="slider-arrow prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="slider-arrow next" onClick={nextSlide}>
            &#10095;
          </button>
          
          <div className="slider-dots">
            {bannerImages.map((_, index) => (
              <button 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <h2>Why Choose NovaCart</h2>
          <div className="about-grid">
            {aboutData.map((item) => (
              <div key={item.id} className="about-card">
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-section">
          <h2>Featured Products</h2>
          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card"
                ref={(el) => (productCardsRef.current[index] = el)}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <Link to={`/product/${product.id}`} className="view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="reviews-section">
          <h2>What Our Customers Say</h2>
          <div className="reviews-carousel">
            <div 
              className="reviews-track" 
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviewsData.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="customer-image">
                    <img src={review.image} alt={review.name} />
                  </div>
                  <h3 className="customer-name">{review.name}</h3>
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="reviews-nav">
            <button onClick={prevReview}>&#10094;</button>
            <button onClick={nextReview}>&#10095;</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home

