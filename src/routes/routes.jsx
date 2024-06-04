import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import ChatPage from '../pages/chat';
import RegisterPage from '../pages/register';

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/" element={<ChatPage />} />
        </Routes>
    </Router>
  );
}

export default AppRoutes;
