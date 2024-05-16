import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import ChatPage from '../pages/chat';
import UserProfileForm from '../pages/form';

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app" element={<ChatPage />} />
            <Route path="/form" element={<UserProfileForm />} />
        </Routes>
    </Router>
  );
}

export default AppRoutes;
