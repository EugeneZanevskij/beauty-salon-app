import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(email, password);

    api.post('/api/login', {
      email,
      password,
    })
      .then((response) => {
        const data = response.data;
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/account';
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  const handleRegisterButton = (e) => {
    e.preventDefault();
    navigate('/register');
  }

  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-page__form" onSubmit={handleLogin}>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="email">Email</label>
          <input
            className='login-page__form-input'
            type="text"
            id="email"
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='login-page__form-row'>
          <label className='login-page__form-label' htmlFor="password">Password</label>
          <input
            className='login-page__form-input'
            type="password"
            id="password"
            value={password}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-page__form-button" type="submit">Login</button>
        <button className="login-page__form-button login-page__form-button--register" type="button" onClick={handleRegisterButton}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
