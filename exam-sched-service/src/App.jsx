import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SettingsPage from './pages/Settings/SettingsPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import BrowsePage from './pages/BrowsePage/BrowsePage';
import AboutPage from './pages/About/AboutPage.jsx';
import UsagePage from './pages/Usage/UsagePage.jsx';
import TwoFVerifyPage from './pages/LoginPage/2FVerifyPage.jsx';
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
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/browse-classes" element={<BrowsePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/2f-verify" element={<TwoFVerifyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
    );
  };

export default App;