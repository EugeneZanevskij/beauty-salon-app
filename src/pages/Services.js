import React, { useState, useEffect } from "react";
import api from '../api';
import '../styles/Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadServices = async () => {
    const response = await api.get("/api/services");
    setServices(response.data);
    console.log(services);
  };
  const loadCategories = async () => {
    const response = await api.get("/api/categories");
    setCategories(response.data);
  }
  useEffect(() => {
    loadCategories();
    loadServices();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredServices = selectedCategory
    ? services.filter((service) => service.category_id === selectedCategory)
    : services;

  return (
    <div className="services-page">
      <h1>Services</h1>
      <div className="categories">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? "active" : ""}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.category}
          </button>
        ))}
      </div>
      <div className="services">
        {filteredServices.map((service) => (
          <div key={service.id} className="service">
            <h2>{service.name}</h2>
            <p>
              <strong>Category:</strong> {service.category}
            </p>
            <p>
              <strong>Price:</strong> ${service.price}
            </p>
            <p>
              <strong>Duration:</strong> {service.duration_minutes} minutes
            </p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Services;