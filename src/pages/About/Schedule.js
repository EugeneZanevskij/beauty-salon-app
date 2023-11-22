import React, { useState, useEffect } from 'react';
import '../../styles/Schedule.css';
import api from '../../api';

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadAppointments = async () => {
    const response = await api.get('/api/appointments');
    setAppointments(response.data);
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSchedule = appointments.filter((appointment) => {
    const clientFullName = `${appointment.firstName} ${appointment.lastName}`;
    const clientMatch = clientFullName.toLowerCase().includes(searchQuery.toLowerCase());
    const masterFullName = `${appointment.masterFirstName} ${appointment.masterLastName}`;
    const masterMatch = masterFullName.toLowerCase().includes(searchQuery.toLowerCase());
    const serviceMatch = appointment.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return clientMatch || masterMatch || serviceMatch;
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="about-schedule">
      <h1 className="about-schedule__title">Schedule</h1>
      <input
        className="about-schedule__search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search schedule"
      />
      <table className="about-schedule__table table">
        <thead>
          <tr className="table__row">
            <th className="table__header">ID</th>
            <th className="table__header">Date</th>
            <th className="table__header">Time</th>
            <th className="table__header">Client</th>
            <th className="table__header">Master</th>
            <th className="table__header">Service</th>
            <th className="table__header">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedule.map((appointment) => (
            <tr className="table__row" key={appointment.id}>
              <td className="table__data">{appointment.id}</td>
              <td className="table__data">{formatDate(appointment.date_signup)}</td>
              <td className="table__data">{appointment.time_signup}</td>
              <td className="table__data">{appointment.firstName} {appointment.lastName}</td>
              <td className="table__data">{appointment.masterFirstName} {appointment.masterLastName}</td>
              <td className="table__data">{appointment.serviceName}</td>
              <td className="table__data">Br {+appointment.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;