import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { useEffect,useState } from 'react';
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
import UpdateProfile from './components/user/UpdateProfile';
import Cart from './components/cart/Cart';
import { createHashHistory } from 'history'
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios'
// Payment
import { Elements,Stripe } from '@stripe/react-stripe-js'
import { loadStripe} from '@stripe/stripe-js'
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';


function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  /* global Stripe */
  //var stripeApiKey= Stripe('pk_test_51KsQrTSFQksB5o8CVWAvkFqXlTsPdTXXbmdSd2v9mYagrvuctylDFBANkEe7LKa3FXxqUIRD8uJmKA2SUcq7eqiy00pzpMWLVU')
  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
      
    }

    getStripeApiKey();
    console.log(stripeApiKey)

  }, [])

  /*useEffect(()=>{
    store.dispatch(loadUser)
  },[])*/

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
            {/*<Route path="/login" element={<Login history={history} location/>} />*/}
            <Route path="/login" element={<Login/>} />
            {/*<Route path="/login" render={({ history }) => <Login history={history} />} />
            <Route path="/register" element={<Register history={history}/>} />
            <Route path="/cart" element={<Cart history={history}/>} />*/}
            <Route path="/register" element={<Register/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/me" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
            <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
            <Route path="/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
            {stripeApiKey &&
              <Route path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute><Payment/></ProtectedRoute>
              </Elements>}/>
            }
            {/*<Route path="/payment" element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
            {/*<Route path="/shipping" element={<ProtectedRoute><Shipping history/></ProtectedRoute>}/>
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>*/}
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
