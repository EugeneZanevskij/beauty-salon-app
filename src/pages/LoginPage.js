import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

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
        // Store the user data in local storage or set an authentication token
        console.log(data);
        // localStorage.setItem('user', JSON.stringify(data));

        // Use history.push to change the address without reloading
        navigate('/account');
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
        // Show an error message or take appropriate action
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
