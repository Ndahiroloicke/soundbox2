import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { HashRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Landing from './pages/landing.tsx';
import Login from './pages/login.tsx';
import Dashboard from './pages/dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
