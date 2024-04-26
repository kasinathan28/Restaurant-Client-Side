import React, { useState } from 'react';
import './Details.css'; // Import your CSS file

function Details({ categoryName }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuy = () => {
    console.log(`Buy ${quantity} ${categoryName}`);
  };

  return (
    <div className="card">
      <div className="details-container">
        <h2>{categoryName}</h2>
        <div className="quantity-control">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className="buy-button" onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
}

export default Details;
