import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    phone_number: '',
    email: '',
    birthday: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/register', client);
      console.log(response.data);
      setClient({
        firstName: '',
        lastName: '',
        phone_number: '',
        email: '',
        birthday: '',
        password: '',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLoginButton = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <div className="login-page">
      <h2 className="login-page__title">Register</h2>
      <form className="login-page__form" onSubmit={handleRegister}>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="firstName">First Name</label>
          <input
            className='login-page__form-input'
            type="text"
            id="firstName"
            name="firstName"
            value={client.firstName}
            onChange={handleChange}
          />
        </div>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="lastName">Last Name</label>
          <input
            className='login-page__form-input'
            type="text"
            id="lastName"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
          />
        </div>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="phoneNumber">Phone Number</label>
          <input
            className='login-page__form-input'
            type="text"
            id="phone_number"
            name="phone_number"
            value={client.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="email">Email</label>
          <input
            className='login-page__form-input'
            type="email"
            id="email"
            name="email"
            value={client.email}
            onChange={handleChange}
          />
        </div>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="birthday">Birthday</label>
          <input
            className='login-page__form-input'
            type="date"
            id="birthday"
            name="birthday"
            value={client.birthday}
            onChange={handleChange}
          />
        </div>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="password">Password</label>
          <input
            className='login-page__form-input'
            type="password"
            id="password"
            name="password"
            value={client.password}
            onChange={handleChange}
          />
        </div>
        <button className="login-page__form-button" type="submit">Register</button>
        <button className="login-page__form-button login-page__form-button--register" type="button" onClick={handleLoginButton}>Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;
