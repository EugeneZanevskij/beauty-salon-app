import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../styles/AccountPage.css';

const AccountPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from the API based on the logged-in user's email
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const email = loggedInUser.email;

    api.get(`/api/user/${email}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error retrieving user information:', error);
      });
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
    </div>
  );
};

export default AccountPage;
