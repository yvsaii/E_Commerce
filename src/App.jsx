import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import ProductList from './Components/ProductList'
import ProductDetails from './Components/ProductDetails'
import Cart from './Components/Cart'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default App
