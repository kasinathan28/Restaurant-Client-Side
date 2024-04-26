import React, { useState } from "react";
import "./index.css";
import FoodImage from "../../../assets/Homepage.jpeg";
import Details from "../details/Details";

function Index() {
  const foodCategories = ["Appetizers", "Main Course", "Desserts", "Drinks"];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  return (
    <div>
      <div className="Navbar">
        <div
          className={`hamburger ${sidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div>
          <h1>Food and Bev Station</h1>
        </div>
      </div>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Food Categories</h2>
        <ul>
          {foodCategories.map((category, index) => (
            <li
              key={index}
              className="category-item"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`overlay ${sidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      ></div>
      <div className="content">
        {selectedCategory ? (
          <Details categoryName={selectedCategory} />
        ) : (
          <div className="default-div">
            <img src={FoodImage} alt="Food" />
            <div className="default-text">
              <h2>Select an option from the sidebar</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;