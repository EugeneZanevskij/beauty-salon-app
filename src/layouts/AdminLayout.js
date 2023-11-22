import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/AdminLayout.css';
import '../styles/Modal.css';
import { isAdmin } from '../utils/admin';

const AdminLayout = () => {
  const isLoggedIn = isAdmin();
  return (
    <main className="admin-layout">
        <nav className="admin-layout__nav">
          <ul className="admin-layout__nav-list">
            <li className="admin-layout__nav-item">
              <Link to="" className="admin-layout__nav-link">Admin</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="admin-layout__nav-item">
                  <Link to="clients" className="admin-layout__nav-link">Clients</Link>
                </li>
                <li className="admin-layout__nav-item">
                  <Link to="masters" className="admin-layout__nav-link">Masters</Link>
                </li>
                <li className="admin-layout__nav-item">
                  <Link to="services" className="admin-layout__nav-link">Services</Link>
                </li>
                <li className="admin-layout__nav-item">
                  <Link to="categories" className="admin-layout__nav-link">Categories</Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        <Outlet />
      </main>
  )
}

export default AdminLayout