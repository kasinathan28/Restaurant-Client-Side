import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import "./PaymentSuccess.css";
import HomeImage from "../../../assets/Homepage.jpeg";
import axios from "axios";
import { BASEURL } from "../../../url/BASEURL";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [paymentAdded, setPaymentAdded] = useState(false); // State to track whether payment is added
  const { razorpayId, orderId } = useParams();

  // Function to add payment
  const addPayment = async () => {
    try {
      if (!paymentAdded) { // Check if payment is already added
        await axios.post(`${BASEURL}/newPayment/${razorpayId}/${orderId}`);
        setPaymentAdded(true); // Set paymentAdded to true after adding payment
      }
    } catch (error) {
      console.error("Error Adding new Payment:", error.response.data);
    }
  };

  useEffect(() => {
    addPayment(); // Call addPayment function when component mounts
  }, []); // Empty dependency array ensures it only runs once

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bgimage1">
      <div className="Navbar">
        <h2>Food and Bev Station</h2>
      </div>
      <img src={HomeImage} alt="Home" />
      {showConfetti && <Confetti />}
      <div className="success-container">
        <div className="sub-container">
          <h1>Thank you for your purchase!</h1>
          <p>Your payment was successful.</p>
          <button className="home-button" onClick={() => navigate("/")}>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
