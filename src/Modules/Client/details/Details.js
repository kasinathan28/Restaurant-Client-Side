import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Details.css";
import { BASEURL, IMAGEURL } from "../../../url/BASEURL";

function Details({ categoryName }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${BASEURL}/getFoods`);
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  // Filter foods based on the category name
  const filteredFoods = foods.filter((food) => food.category === categoryName);

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
                <p>Price: ${food.price}</p>
              </div>

              <div className="food-image">
                <img src={`${IMAGEURL}/${food.image}`} alt={food.name} />
              </div>
            </div>
            <div className="quantity-buy">
              <div className="quantity-control">
                <button>-</button>
                <span>1</span> <button>+</button>
              </div>
              <button className="buy-button">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;