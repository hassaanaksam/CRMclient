import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import CustomerData from './pages/CustomerData';
import Home from './pages/Home';
import UserData from './pages/UserData';
import AddCustomer from "./components/AddCustomer"
import UpdateCustomer from './pages/UpdateCustomer';
import UpdateUser from './pages/UpdateUser';
import SendEmail from './pages/SendEmail';
import SendSms from './pages/SendSms';
import SendEmailToAll from './pages/SendEmailToAll';

function App() {

  const token = localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={token ? <Signup /> : <Login />} />
            <Route path="/" element={token ? <Home /> : <Login />} />
            <Route path="/contact" element={token ? <Contact /> : <Login />} />
            <Route path="/userdata" element={token ? <UserData /> : <Login />} />
            <Route path="/customerdata" element={token ? <CustomerData /> : <Login />} />
            <Route path="/updatecustomer/:customerId" element={token ? <UpdateCustomer /> : <Login />} />
            <Route path="/updateuser/:userId" element={token ? <UpdateUser /> : <Login />} />
            <Route path="/addcustomer" element={token ? <AddCustomer /> : <Login />} />
            <Route path='/sendemail/:customerEmail' element={token ? <SendEmail /> : <Login />} />
            <Route path='/sendemails' element={token ? <SendEmailToAll /> : <Login />} />
            <Route path='/sendsms/:contact' element={token ? <SendSms /> : <Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
