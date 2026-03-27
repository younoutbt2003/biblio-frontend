import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/researcher/dashboard';
import { Publications } from '../pages/researcher/publications';
import { Collaboration } from '../pages/researcher/collaboration';
import { Register } from '../pages/auth/register';
import { Login } from '../pages/auth/login';


export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};