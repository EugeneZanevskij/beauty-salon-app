import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/HomeLayout.css';
import '../styles/Table.css';
import { isAuthenticated } from '../utils/auth';

const HomeLayout = () => {
  const isLoggedIn = isAuthenticated();

  return (
    <>
      <header className="header">
      <Link to="" className="header__link">
        <h1 className="header__title">Z&Z Beauty Lounge</h1>
      </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="" className="header__link">Main</Link>
            </li>
            <li className="header__nav-item">
              <Link to="about" className='header__link'>About</Link>
            </li>
            {isLoggedIn ? (
              <li className="header__nav-item">
                <Link to="account" className='header__link'>Account</Link>
              </li>
            ) : (
              <li className="header__nav-item">
                <Link to="login" className='header__link'>Login</Link>
              </li>
            )}
            <li className="header__nav-item">
              <Link to="admin" className='header__link'>Admin</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
};

export default HomeLayout;