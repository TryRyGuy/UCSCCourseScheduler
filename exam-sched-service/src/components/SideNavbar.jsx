import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`bg-gray-700 text-white h-full p-4 pt-20 fixed top-0 left-0 z-10 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <button onClick={toggleNavbar} className="bg-gray-600 p-2 rounded mb-4">
        {collapsed ? '>' : '<'}
      </button>
      <ul className="space-y-2">
        <li><Link to="/" className="block p-2 hover:bg-gray-600 rounded">Home</Link></li>
        <li><Link to="/login" className="block p-2 hover:bg-gray-600 rounded">Login</Link></li>
      </ul>
    </div>
  );
};

export default SideNavbar;