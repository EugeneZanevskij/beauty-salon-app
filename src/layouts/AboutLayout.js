import { Link, Outlet } from 'react-router-dom';
import '../styles/AboutLayout.css';

function HomePage() {
  return (
    <>
      <main className="main-content">
        <Outlet />
      </main>
      <aside className='sidebar'>
        <nav>
          <ul>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/masters">Masters</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default HomePage;