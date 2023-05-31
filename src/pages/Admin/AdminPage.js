import React from 'react';
import { isAdmin } from '../../utils/admin';
import AdminLogin from './AdminLogin';
import api from '../../api';
import '../../styles/AdminPage.css';

const AdminPage = () => {
  const isLoggedIn = isAdmin();

  const handleLogin = async (login, password) => {
    api.post('/api/admin', {
      login,
      password,
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem('admin', JSON.stringify(data));
      window.location.href = '/admin';
    })
    .catch((error) => {
      console.error('Login error:', error);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/';
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1 className="admin-page__heading">You can work with clients, masters, services, categories</h1>
          <h2 className="admin-page__sub-heading">Add new</h2>
          <h2 className="admin-page__sub-heading">Edit</h2>
          <h2 className="admin-page__sub-heading">Delete</h2>
          <button className="admin-page__btn" onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </>
  );
};

export default AdminPage;
