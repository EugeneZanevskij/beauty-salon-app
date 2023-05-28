import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../styles/AccountPage.css';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const loadUser = (email) => {
    api.get(`/api/user/${email}`)
    .then((response) => {
      const userData = response.data;
      setUser(userData);
    })
    .catch((error) => {
      console.error('Error retrieving user information:', error);
    });
  }
  const loadAppointments = async (email) => {
    const response = await api.get('/api/appointments');
    const data = response.data;
    setAppointments(data.filter((appointment) => appointment.email === email));
  };
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const email = loggedInUser.email;
    loadUser(email);
    loadAppointments(email);
    // Retrieve user information from the API based on the logged-in user's email
  }, []);

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <div className="account-page">
      <h2>Account Information</h2>
      {user ? (
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Birthday:</strong> {formatDate(user.birthday)}
          </p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    <div className="schedule-page">
      <h1>Appointments</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Date</th>
            <th>Time</th>
            <th>Master</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              {/* <td>{appointment.id}</td> */}
              <td>{formatDate(appointment.date_signup)}</td>
              <td>{appointment.time_signup}</td>
              <td>{appointment.masterFirstName} {appointment.masterLastName}</td>
              <td>{appointment.serviceName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AccountPage;
