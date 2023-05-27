import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/HomeLayout.css';

const HomeLayout = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Welcome to Beauty Salon!</h1>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="" className="header__nav-link">Main</Link>
            </li>
            <li className="header__nav-item">
              <Link to="about" className='header__nav-link'>About</Link>
            </li>
            <li className="header__nav-item">
              <Link to="account" className='header__nav-link'>Account</Link>
            </li>
            <li className="header__nav-item">
              <Link to="admin" className='header__nav-link'>Admin</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default HomeLayout