import { Link, Outlet } from 'react-router-dom';
import '../styles/AboutLayout.css';

function AboutLayout() {
  return (
    <>
      <main className="about">
        <Outlet />
      </main>
      <aside className='about__sidebar'>
        <nav className='about__sidebar-nav'>
          <ul className='about__sidebar-list'>
            <li className='about__sidebar-item'>
              <Link to="" className='about__sidebar-link'>About</Link>
            </li>
            <li className='about__sidebar-item'>
              <Link to="services" className='about__sidebar-link'>Services</Link>
            </li>
            <li className='about__sidebar-item'>
              <Link to="masters" className='about__sidebar-link'>Masters</Link>
            </li>
            <li className='about__sidebar-item'>
              <Link to="schedule" className='about__sidebar-link'>Schedule</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default AboutLayout;