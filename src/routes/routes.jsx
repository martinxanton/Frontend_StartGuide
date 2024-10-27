import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import ChatPage from '../pages/chat';
import RegisterPage from '../pages/register';
import Logout from '../components/Logout';
import Redirect from '../components/Redirect';

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/:uuid" element={<ChatPage modeChat = {2} />} />
            <Route path='/' element={<Redirect/>} />
            <Route path="/u/" element={<ChatPage modeChat = {1}  />} />
            <Route path="/u/:bot" element={<ChatPage modeChat = {1} />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    </Router>
  );
}

export default AppRoutes;
