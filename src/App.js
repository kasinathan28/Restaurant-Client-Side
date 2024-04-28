import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "../src/Modules/Client/Index/Index"
import OrderDetails from './Modules/Client/order-details/OrderDetails';
import PaymentSuccess from './Modules/Client/PaymentSuccess/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/order-details" element={<OrderDetails/>} />
        <Route path='/success' element={<PaymentSuccess/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;