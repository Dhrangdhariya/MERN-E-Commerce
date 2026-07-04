import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Main from './pages/Main';
import Cart from './pages/cart';
import Product from './pages/Product';


function App() {
  return (
    <>
      <Router>
        <div>
          <main>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/main' element={<Main />}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="*" element={<h1 className="text-3xl font-bold text-center mt-20">404 - Page Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App
