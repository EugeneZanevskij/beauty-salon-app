import React, { useState, useEffect } from 'react';
import '../../styles/Masters.css';
import api from '../../api';

const Masters = () => {
  const [masters, setMasters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadMasters = async () => {
    const response = await api.get("/api/masters/masters_data");
    setMasters(response.data);
  };

  useEffect(() => {
    loadMasters();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMasters = masters.filter((master) => {
    const fullName = `${master.firstName} ${master.lastName}`;
    const servicesMatch = master.services.some((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return fullName.toLowerCase().includes(searchQuery.toLowerCase()) || servicesMatch;
  });
  

  return (
    <div className="about__masters">
      <h1 className="about__masters-title">Masters</h1>
      <input
        className="about__masters-search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search masters"
      />
      <div className="about__masters-masters">
        {filteredMasters.map((master) => (
          <div key={master.id} className="about__masters-masters__card">
            <h2 className="about__masters-masters__card-title">{master.firstName} {master.lastName}</h2>
            <div className="about__masters-masters__card-info">
              <strong>Coefficient:</strong> {master.coefficient}
            </div>
            <h3 className="about__masters-masters__card-title">Services:</h3>
            <ul className="about__masters-masters__card-list">
              {master.services.map((service) => (
                  <li key={service.id} className="about__masters-masters__card-info">
                    <span>{service.name}</span>{service.category}
                  </li>
              ))}
              </ul>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Masters;