import Header from './components/layout/Navbar.js';
import Footer from './components/layout/Footer'
import Home from './components/Home/Home'
import ProductDetails from './components/Product/ProductDetails'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"; 
import Webfont from "webfontloader";
import {useEffect,useState } from "react";
import Product from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdatePassword from './components/User/UpdatePassword';
import ForgetPassword from './components/User/ForgetPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import NotFound from './components/layout/NotFound';
import ImageUpdate from './components/User/ImageUpdate';
import About from './components/layout/About.js';

function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user);

  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapiKey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    Webfont.load({
      google:{
         families:["Roboto","Droid Sans","Chilanka"]
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  },[])

  return(
  <Router>
    <Header/> 
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
    <Route exact path="/" Component={Home} />
    <Route exact path="/product/:id" Component={ProductDetails}/>
    <Route exact path="/products" Component={Product}/>
    <Route path="/products/:keyword" Component={Product}/>
    <Route exact path="/search" Component={Search}/>
    <Route exact path="/about" Component={About}/>
    <Route exact path="/login" Component={LoginSignUp}/>
    <Route exact path="/account" Component={Profile}/>
    <Route path='/me/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
    <Route path='/me/Imageupdate' element={<ProtectedRoute><ImageUpdate/></ProtectedRoute>}/>
    <Route path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
    <Route exact path="/password/forget" Component={ForgetPassword}/>
    <Route exact path="/password/reset/:token" Component={ResetPassword}/>
    <Route exact path="/cart" Component={Cart}/>
    <Route path='/login/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
    <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
    <Route path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
    <Route path='/orders' element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
    <Route path='/order/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
    <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
    <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>}/>
    <Route path='/admin/product' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>}/>
    <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
    <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
    <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><ProcessOrder/></ProtectedRoute>}/>
    {stripeApiKey && <Route path='/process/payment' 
    element={<Elements stripe={loadStripe(stripeApiKey)}>
    <ProtectedRoute><Payment/></ProtectedRoute></Elements>}/>}
    <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UsersList/></ProtectedRoute>}/>
    <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
    <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ProductReviews/></ProtectedRoute>}/>
    <Route path='/*' element={<NotFound/>}/>    
    </Routes>
    <Footer/>  
  </Router>
  );
}

export default App;
