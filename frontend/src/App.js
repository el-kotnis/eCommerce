import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import Navbar from './components/layout/Navbar';
import About from './components/About';
import Tea from './components/Tea';
import Coffee from './components/Coffee';
import Merchandise from './components/Merchandise';
import Appliances from './components/Appliances';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar/>
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tea" element={<Tea />} />
            <Route path="/coffee" element={<Coffee />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/merch" element={<Merchandise />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
