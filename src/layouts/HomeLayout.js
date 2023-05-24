import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/HomeLayout.css';

const HomeLayout = () => {
  return (
    <div className='container'>
      <header className="header">
        <h1>Welcome to Beauty Salon!</h1>
        {/*TODO: Add links to each page */}
        <nav>
          <ul>
            <li>
              <Link to="/client">Client Account</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default HomeLayout