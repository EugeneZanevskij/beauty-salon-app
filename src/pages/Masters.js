import React, { useState, useEffect } from 'react';
import '../styles/Masters.css';
import api from '../api';

const Masters = () => {
  const [masters, setMasters] = useState([]);
  // const [categories, setCategories] = useState(['Haircut', 'Manicure']);
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState(null);

  const loadMasters = async () => {
    const response = await api.get("/api/masters");
    setMasters(response.data);
  };
  // const loadCategories = async () => {
  //   const response = await api.get("/api/categories");
  //   setCategories(response.data);
  // };

  useEffect(() => {
    loadMasters();
    // loadCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
    <div className="about__masters">
      <h1 className="about__masters-title">Masters</h1>
      <div className="about__masters-filters">
        <input
          className="about__masters-filters__input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search masters"
        />
        {/* TODO: search services */}
        {/* <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search masters"
        /> */}
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
      <div className="about__masters-masters">
        {masters.map((master) => (
          <div key={master.id} className="about__masters-masters__card">
            <h2 className="about__masters-masters__card-title">{master.firstName} {master.lastName}</h2>
            <div className="about__masters-masters__card-info">
              <strong>Coefficient:</strong> {master.coefficient}
            </div>
            <h3 className="about__masters-masters__card-title">Services:</h3>
            {/* <ul>
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
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Masters