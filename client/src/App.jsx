import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes,useLocation} from 'react-router-dom'
import Home from './pages/Home';
import PaymentPage from './pages/Payment';
import Navbar from './components/Navbar';
import ServicesPage from './pages/Services';
import OrderCompletePage from './pages/OrderCompletePage';
import CartPage from './pages/CartPage';
import EventPlanningPage from './pages/EventPlanningPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import AdminPage from './pages/Admin';
import RegisterOrganiser from './pages/RegisterOrganiser';
import EventOrganiserPanel from './pages/EventOrganiserPanel';
import EventDetail from './pages/EventDetail';
import Footer from './components/Footer';
import Booking from './pages/Booking';


function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();

  const isPaymentPage = location.pathname === '/payment' || location.pathname === '/login';



  return (
    <>
  <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<h1>About Us</h1>} />
      <Route path="/admin" element={<AdminPage/>} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />
      <Route path="/order_cmpt" element={<OrderCompletePage/>} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/services/event-planning" element={<EventPlanningPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-organiser" element={<RegisterOrganiser />} /> 
      <Route path="/event-organiser" element={<EventOrganiserPanel />} />  
      <Route path="/event_detail" element={<EventDetail />} />
      <Route path="/booking" element={<Booking />} />



    </Routes>
    <Footer/>
    

    </>
  )
}

export default App
