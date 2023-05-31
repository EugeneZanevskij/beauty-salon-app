import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(login, password);
  };

  return (
    <form className='login-page__form' onSubmit={handleSubmit}>
      <h1>Log in as admin</h1>
      <div className='login-page__form-row'>
        <label className='login-page__form-label' htmlFor="login">login:</label>
        <input className='login-page__form-input' id="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      </div>
      <div className='login-page__form-row'>
      <label className='login-page__form-label' htmlFor="password">Password</label>
        <input className='login-page__form-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-page__form-button" type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
