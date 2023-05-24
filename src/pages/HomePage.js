import { Link, useRoutes } from 'react-router-dom';
import '../styles/HomePage.css';
import MainView from '../components/MainView';

function HomePage() {
  const routes = useRoutes([
    { path: '/', element: <MainView /> },
  ]);

  return (
    <div className='container'>
      <header className="header">
        <h1>Welcome to Beauty Salon!</h1>
        <nav>
          <ul>
            <li>
              <Link to="/client">Client Account</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        {routes}
      </main>
      <aside className='sidebar'>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
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
    </div>
  );
}

export default HomePage;