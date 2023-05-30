import React, { useState, useEffect } from "react";
import api from '../../api';
import '../../styles/Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadServices = async () => {
    const response = await api.get("/api/services/service_category");
    setServices(response.data);
  };
  const loadCategories = async () => {
    const response = await api.get("/api/categories");
    setCategories(response.data);
  };
  
  useEffect(() => {
    loadCategories();
    loadServices();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredServices = (selectedCategory
    ? services.filter((service) => service.category_id === selectedCategory)
    : services)
    .filter((service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="about__services">
      <h1 className="about__services-title">Services</h1>
      <input 
        className="about__services-search"
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="about__services-categories">
        <button
          className={`about__services-categories__button ${selectedCategory === null ? "active" : ""}`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`about__services-categories__button ${selectedCategory === category.id ? "active" : ""}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.category}
          </button>
        ))}
      </div>
      <div className="about__services-services">
        {filteredServices.map((service) => (
          <div key={service.id} className="about__services-services__card">
            <h2 className="about__services-services__card-title">{service.name}</h2>
            <div className="about__services-services__card-info">
              <strong>Category:</strong> {service.category}
            </div>
            <div className="about__services-services__card-info">
              <strong>Price:</strong> Br {service.price}
            </div>
            <div className="about__services-services__card-info">
              <strong>Duration:</strong> {service.duration_minutes} minutes
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Services;