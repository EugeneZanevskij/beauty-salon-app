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
    <div className="schedule-page">
      <h1>Schedule</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Client</th>
            <th>Master</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{formatDate(appointment.date_signup)}</td>
              <td>{appointment.time_signup}</td>
              <td>{appointment.firstName} {appointment.lastName}</td>
              <td>{appointment.masterFirstName} {appointment.masterLastName}</td>
              <td>{appointment.serviceName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;