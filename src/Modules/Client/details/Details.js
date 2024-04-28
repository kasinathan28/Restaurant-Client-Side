import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL, IMAGEURL } from "../../../url/BASEURL";
import { useNavigate } from "react-router-dom";
import "./Details.css";


function Details({ categoryName, setTotalPrice }) {
  const [foods, setFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${BASEURL}/getFoods`);
        setFoods(response.data);
        // Initialize quantities state with default value 0 for each food
        const initialQuantities = {};
        response.data.forEach((food) => {
          initialQuantities[food._id] = 0;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  // Filter foods based on the category name
  const filteredFoods = foods.filter((food) => food.category === categoryName);

  const decreaseQuantity = (foodId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [foodId]: Math.max(0, prevQuantities[foodId] - 1),
    }));
  };

  const increaseQuantity = (foodId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [foodId]: prevQuantities[foodId] + 1,
    }));
  };

  const addToCart = (foodId) => {
    const quantityToAdd = quantities[foodId];
    console.log("Quantity to add:", quantityToAdd);

    if (quantityToAdd > 0) {
      const existingCartItemIndex = cartItems.findIndex(
        (item) => item._id === foodId
      );
      console.log("Existing cart item index:", existingCartItemIndex);

      if (existingCartItemIndex !== -1) {
        // If the food is already in the cart, update its quantity
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex].quantity += quantityToAdd;
        setCartItems(updatedCartItems);
        console.log("Cart items after updating quantity:", updatedCartItems);
      } else {
        // If the food is not in the cart, add it
        const foodToAdd = filteredFoods.find((food) => food._id === foodId);
        const newCartItem = { ...foodToAdd, quantity: quantityToAdd };
        const updatedCartItems = [...cartItems, newCartItem];
        setCartItems(updatedCartItems);
        console.log("Cart items after adding new item:", updatedCartItems);
      }
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setTotalPrice(totalPrice);
  }, [totalPrice, setTotalPrice]);

  const handleBuyNow = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };


  const handleOrderNow = async () => {
    try {
      const response = await axios.post(`${BASEURL}/order`, {
        tableNumber: tableNumber,
        cartItems: cartItems.map((item) => ({
          foodName: item.name,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
      });
  
      console.log("Order submitted successfully:", response.data._id);
  
      const orderDetails = {
        orderId: response.data._id, // Add order ID to order details
        tableNumber: tableNumber,
        cartItems: cartItems.map((item) => ({
          foodName: item.name,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity // Calculate total price per item
        })),
        totalAmount: totalPrice // Calculate total amount
      };
  
      console.log("order details from the order page111:", orderDetails);
      setCartItems([]);
      // Close the popup
      setShowPopup(false);
  
      // Pass the order details and order ID to the order-details page as state
      navigate('/order-details', { state: { order: orderDetails, orderId: response.data._id } });
    } catch (error) {
      console.error("Error submitting order:", error);
      // Optionally, display an error message to the user
    }
  };
  

  return (
    <div className="details-container">
      <h2>{categoryName}</h2>
      <div className="food-cards-container">
        {filteredFoods.map((food) => (
          <div key={food._id} className="food-card">
            <div className="flex">
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <p>Price: {food.price}/-</p>
              </div>

              <div className="food-image">
                <img src={`${IMAGEURL}/${food.image}`} alt={food.name} />
              </div>
            </div>
            <div className="quantity-buy">
              <div className="quantity-control">
                <button onClick={() => decreaseQuantity(food._id)}>-</button>
                <span>{quantities[food._id]}</span>
                <button onClick={() => increaseQuantity(food._id)}>+</button>
              </div>
              <button
                onClick={() => addToCart(food._id)}
                className="buy-button"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popupbg">
          <div className="order-popup">
            <h3>Order Details</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item._id}>
                  {item.name} -:- {item.quantity} - Price:{" "}
                  {item.price * item.quantity}/-
                </li>
              ))}
            </ul>
            <p>Total Amount: {totalPrice}</p>
            <input
              type="text"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <button onClick={handleOrderNow}>Order Now</button>
            <button onClick={handleCancel} id="cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="total">
        <h3>Total: {totalPrice}</h3>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default Details;
