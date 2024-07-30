import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './index.css';

const App = () => {
    return (
      <Router>
      <div className="relative h-screen w-screen flex flex-col">
        <TopNavbar />
        <SideNavbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
    );
  };

export default App;