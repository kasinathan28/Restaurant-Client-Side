import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Homapage from "../../../assets/Homepage.jpeg";
import "./OrderDetails.css";
import SocketComponent from "../../../socketio/Socketio";
import axios from "axios";
import { BASEURL } from "../../../url/BASEURL";
import loadRazorpayScript from "../../../components/Razorpay";

function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const order = state ? state.order : null;
  const orderId = state ? state.orderId : null;
  const [orderStatus, setOrderStatus] = useState("");
  const [foodStatus, setFoodStatus] = useState("");
  const [rzPaymentId, setRzPaymentId] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/orderstatus/${orderId}`);
        setFoodStatus(response.data.status);
        // Calculate remaining time based on the number of food items
        const timeNeeded = order.cartItems.length * 2 * 5; // 2 minutes per food item
        setRemainingTime(timeNeeded);
      } catch (error) {
        console.error("Error fetching food status:", error);
      }
    };

    fetchData();
  }, [orderId, order.cartItems]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 0) {
          setTimerFinished(true);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleOrderStatusUpdated = (status) => {
    setOrderStatus(status);
  };

  const initializePayment = async () => {
    try {
      const response = await axios.post(`${BASEURL}/payment`, {
        orderId: orderId,
        amount: order.totalAmount,
      });

      setRzPaymentId(response.data.paymentId);

      if (window.Razorpay) {
        const options = {
          key: "rzp_test_VUZ8A8Z6vALwLL",
          amount: order.totalAmount * 100,
          currency: "INR",
          name: "Food and Bev Station",
          description: "Payment for order",
          order_id: response.data.orderId,
          handler: function (response) {
            navigate(`/success/${response.razorpay_payment_id}/${orderId}`);
          },
        };
        const rzPay = new window.Razorpay(options);
        rzPay.open();
      } else {
        console.error("Razorpay SDK not available.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  useEffect(() => {
    const loadRazorpay = async () => {
      try {
        await loadRazorpayScript();
        console.log("Razorpay script loaded successfully.");
      } catch (error) {
        console.error("Error loading Razorpay script:", error);
      }
    };

    loadRazorpay();
  }, []);

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
            <p className="total-amount">
              Total Amount: {order.totalAmount}
            </p>
            {(orderStatus === "delivered" || foodStatus === "delivered") && (
              <button className="pay-now-button" onClick={initializePayment}>
                Pay Now
              </button>
            )}
            {!timerFinished && (
              <div>
                <p className="waiting-message">
                  Waiting for the delivery of the food... <br />
                  Time Remaining: {remainingTime} seconds
                </p>
              </div>
            )}
            {timerFinished && (
              <div>
                <button className="pay-now-button" onClick={initializePayment}>
                  Pay Now
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="no-items">No order details found.</p>
        )}
      </div>
      <SocketComponent
        orderId={orderId}
        onOrderStatusUpdated={handleOrderStatusUpdated}
      />
    </div>
  );
}

export default OrderDetails;
