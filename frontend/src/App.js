import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
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
import Home2 from './components/Home2';
import Login from './components/user/Login';
import Register from './components/user/Register';
import {loadUser} from './actions/userActions'
import store from './store'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser)
  },[])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)


  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar/>
        <div className="container container-fluid">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home2 />} />
            <Route path="/about" element={<About />} />
            <Route path="/tea" element={<Tea />} />
            <Route path="/coffee" element={<Coffee />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/merch" element={<Merchandise />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login/>} />
            {/*<Route path="/login" render={({ history }) => <Login history={history} />} />*/}
            <Route path="/register" element={<Register/>} />
            <Route path="/me" 
              element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
