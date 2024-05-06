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
  const [feedback, setFeedback] = useState(""); // State to store feedback
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State to track if feedback is submitted
  const { razorpayId, orderId } = useParams();

  const addPayment = async () => {
    try {
      await axios.post(`${BASEURL}/newPayment/${razorpayId}/${orderId}`);
    } catch (error) {
      console.error("Error Adding new Payment:", error.response.data);
    }
  };

  useEffect(() => {
    addPayment();
  }, []);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitFeedback = async () => {
    try {
      await axios.post(`${BASEURL}/newFeedBack`, { message: feedback });
      setFeedbackSubmitted(true);
      navigate("/");
    } catch (error) {
      console.error("Error submitting feedback:", error.response.data);
    }
  };


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
          {!feedbackSubmitted && (
            <div className="feedback-container">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback..."
              />
              <button onClick={handleSubmitFeedback}>Submit Feedback</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
