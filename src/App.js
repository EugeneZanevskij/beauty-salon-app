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
      <Route path='admin' element={<AdminLayout />}></Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
