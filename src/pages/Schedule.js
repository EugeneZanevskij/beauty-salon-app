import React, { useState, useEffect } from 'react';
import '../styles/Schedule.css';
import api from '../api';

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const response = await api.get('/api/appointments');
    setAppointments(response.data);
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div className="about-schedule">
      <h1 className="about-schedule__title">Schedule</h1>
      <table className="about-schedule__table table">
        <thead>
          <tr className="table__row">
            <th className="table__header">ID</th>
            <th className="table__header">Date</th>
            <th className="table__header">Time</th>
            <th className="table__header">Client</th>
            <th className="table__header">Master</th>
            <th className="table__header">Service</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr className="table__row" key={appointment.id}>
              <td className="table__data">{appointment.id}</td>
              <td className="table__data">{formatDate(appointment.date_signup)}</td>
              <td className="table__data">{appointment.time_signup}</td>
              <td className="table__data">{appointment.firstName} {appointment.lastName}</td>
              <td className="table__data">{appointment.masterFirstName} {appointment.masterLastName}</td>
              <td className="table__data">{appointment.serviceName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;