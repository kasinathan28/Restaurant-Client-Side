import React from "react";
import { useLocation } from "react-router-dom";
import Homapage from "../../../assets/Homepage.jpeg";
import "./OrderDetails.css";
import SocketComponent from "../../../socketio/Socketio";


function OrderDetails() {
  const location = useLocation();
  const { state } = location;
  const order = state ? state.order : null;

  console.log(order);

  return (
    <div className="ORD">
      <div className="Navbar">
        <div>
          <h1>Food and Bev Station</h1>
        </div>
      </div>
      <div className="bgimage">
        <img src={Homapage} alt="Home Page" />
      </div>
      <div className="card">
        <h2>Order Details</h2>
        {order ? (
          <div>
            <p>Table Number: {order.tableNumber}</p>
            {order.cartItems ? (
              <div>
                <h3>Items:</h3>
                <ul>
                  {order.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.foodName} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="no-items">No items found.</p>
            )}
            <p className="total-amount">Total Amount: {order.totalAmount}</p>
          </div>
        ) : (
          <p className="no-items">No order details found.</p>
        )}
      </div>

      <SocketComponent/>
    </div>
  );
}

export default OrderDetails;
