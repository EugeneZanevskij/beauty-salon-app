import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './index.css';
import HomeLayout from './layouts/HomeLayout';
import AboutLayout from './layouts/AboutLayout';
import HomePage from './pages/HomePage';
import Services from './pages/Services';
import Masters from './pages/Masters';
import Schedule from './pages/Schedule';
import AboutPage from './pages/AboutPage';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import ClientsAdmin from './pages/ClientsAdmin';
import MastersAdmin from './pages/MastersAdmin';
import ServicesAdmin from './pages/ServicesAdmin';
import CategoriesAdmin from './pages/CategoriesAdmin';
import AccountLayout from './layouts/AccountLayout';
import AccountPage from './pages/Account/AccountPage';
import BookingPage from './pages/Account/BookingPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />} >
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutLayout />} >
        <Route index element={<AboutPage />} />
        <Route path="services" element={<Services />} />
        <Route path="masters" element={<Masters />} />
        <Route path="schedule" element={<Schedule />} />
      </Route>
      <Route path='admin' element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="clients" element={<ClientsAdmin />} />
        <Route path="masters" element={<MastersAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="categories" element={<CategoriesAdmin />} />
      </Route>
      <Route path='account' element={<AccountLayout />}>
        <Route index element={<AccountPage />} />
        <Route path='booking' element={<BookingPage />} />
      </Route>
      <Route path='login' element={<LoginPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
