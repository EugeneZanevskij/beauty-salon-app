import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './index.css';
import HomeLayout from './layouts/HomeLayout';
import AboutPage from './layouts/AboutLayout';
import HomePage from './pages/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />} >
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
