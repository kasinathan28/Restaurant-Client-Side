import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./PaymentSuccess.css";
import HomeImage from "../../../assets/Homepage.jpeg";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
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
