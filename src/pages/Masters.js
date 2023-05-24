import React, { useState, useEffect } from 'react';
import '../styles/Masters.css';
import axios from 'axios';

const Masters = () => {
  const [masters, setMasters] = useState([]);
  const [categories, setCategories] = useState(['Haircut', 'Manicure']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // useEffect(() => {
  //   axios.get('/api/masters').then((res) => {
  //     setMasters(res.data);
  //   });
  //   axios.get('/api/categories').then((res) => {
  //     setCategories(res.data);
  //   });
  // }, []);

  useEffect(() => {
    // Fetch masters data from API or database
    const fetchedMasters = [
      {
        id: 1,
        name: "John Smith",
        coefficient: 1.5,
        services: [
          {
            id: 1,
            name: "Haircut",
            category: "Hair",
            price: 30,
            duration_minutes: 45,
          },
          {
            id: 2,
            name: "Manicure",
            category: "Nails",
            price: 20,
            duration_minutes: 30,
          },
        ],
      },
      {
        id: 2,
        name: "Emily Johnson",
        coefficient: 2.0,
        services: [
          {
            id: 3,
            name: "Facial",
            category: "Skin Care",
            price: 50,
            duration_minutes: 60,
          },
          {
            id: 4,
            name: "Pedicure",
            category: "Nails",
            price: 25,
            duration_minutes: 40,
          },
        ],
      },
      // Add more masters as needed
    ];

    setMasters(fetchedMasters);
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  //TODO: doesn't work
  // const filteredMasters = masters.filter((master) => {
    // const isMatchingSearch = master.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   master.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    // const isMatchingCategory = selectedCategory === null || master.services[0].category === selectedCategory || selectedCategory === "";
    // return isMatchingSearch && isMatchingCategory;
  //   return isMatchingCategory;
  // });

  return (
    <div className="masters-page">
      <h1>Masters</h1>
      <div className="filters">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search masters"
        />
        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="masters">
        {filteredMasters.map((master) => (
          <div key={master.id} className="master">
            <h2>{master.firstName} {master.lastName}</h2>
            <p>Coefficient: {master.coefficient}</p>
            <p>Category: {master.services.category}</p>
            <ul>
              {master.services.map((service) => (
                <li key={service.id}>{service.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
      <div className="masters">
        {masters.map((master) => (
          <div key={master.id} className="master">
            <h2>{master.name}</h2>
            <p>
              <strong>Coefficient:</strong> {master.coefficient}
            </p>
            <h3>Services:</h3>
            <ul>
              {master.services.map((service) => (
                <li key={service.id}>
                  <p>
                    <strong>Name:</strong> {service.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {service.category}
                  </p>
                  <p>
                    <strong>Price:</strong> ${service.price}
                  </p>
                  <p>
                    <strong>Duration:</strong> {service.duration_minutes} minutes
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Masters