import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faShoppingCart, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const SideNavbar = () => {
  /*const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`bg-sideNavGrey1 text-white h-full p-4 pt-20 fixed top-0 left-0 z-10 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <button onClick={toggleNavbar} className="bg-sideNavGrey1 p-2 rounded mb-4">
        {collapsed ? '>' : '<'}
      </button>
      <ul className="space-y-2">
        <li><Link to="/" className="block p-2 hover:bg-gray-600 rounded">Home</Link></li>
        <li><Link to="/login" className="block p-2 hover:bg-gray-600 rounded">Login</Link></li>
      </ul>
    </div>
  );*/

  return (
    <div className="bg-sideNavGrey1 h-screen fixed top-0 left-0 z-10 transform hover:w-64 w-16 transition-all duration-300 flex flex-col justify-between">
      <div className="flex-grow"></div> {/* Spacer to push content to the bottom */}
      <div className="flex flex-col items-center mb-4 space-y-4">
        <a href="https://catalog.ucsc.edu/" className="text-white p-2 hover:bg-customBlue w-full text-center transition-colors duration-300" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" />
        </a>
        <Link to="/checkout" className="text-white p-2 hover:bg-customBlue w-full text-center transition-colors duration-300">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        </Link>
        <Link to="/settings" className="text-white p-2 hover:bg-customBlue w-full text-center transition-colors duration-300">
          <FontAwesomeIcon icon={faCog} size="2x" />
        </Link>
        <Link to="/login" className="text-white p-2 hover:bg-customBlue w-full text-center transition-colors duration-300">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;