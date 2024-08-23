import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faShoppingCart, faGraduationCap, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useSession } from './SessionContext.jsx';
import axios from 'axios';

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user, setUser, csrfToken, schedules, classCounts } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', 
        {}, 
        { withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csrfToken // Include the CSRF token in the header
          }
        });
      setUser(null); // Clear the session in context
      navigate('/'); // Redirect to the landing page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <div
      className={`bg-sideNavGrey1 h-screen fixed top-0 left-0 z-10 transition-all duration-300 flex flex-col justify-between pt-16 ${isHovered ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shopping Cart Icon at the Top */}
      <div className="flex flex-col items-start mt-4 space-y-4 pl-4">
        <div className="text-black p-0 w-full flex items-center">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" className="mr-2" />
        </div>
      </div>

      <div className="flex-grow"></div> {/* Spacer to push content to the bottom */}

      <div className="flex flex-col items-start mb-4 space-y-4 pl-4">
        <a href="https://catalog.ucsc.edu/" className="text-black p-0 hover:bg-customBlue w-full text-left flex items-center">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" className="mr-2" />
          <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
            Course Catalog
          </span>
        </a>
        <Link to="/checkout" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="mr-4" />
          <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
            Planning Tool
          </span>
        </Link>
        {/* Conditionally render the settings button based on user login status */}
        {user && (
          <Link to="/settings" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
            <FontAwesomeIcon icon={faCog} size="2x" className="mr-3" />
            <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
              Settings
            </span>
          </Link>
        )}
        {/* Conditionally render the logout or login/signup button */}
        {user ? (
          <div className="flex items-center w-full p-1">
            <div
              className="mr-3 bg-white text-black rounded-full flex items-center justify-center"
              style={{ width: '34px', height: '34px', minWidth: '34px', minHeight: '34px', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              {user.email.slice(0, 2).toUpperCase()}
            </div>
            <span
              className={`font-semibold text-black transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} cursor-pointer transition-colors hover:text-hoverLogout flex-grow text-left ml-2 whitespace-nowrap`}
              onClick={handleLogout}
              style={{ fontFamily: 'inherit', fontSize: 'inherit' }}  // Ensures consistency with other elements
            >
              Log Out
            </span>
          </div>
        ) : (
          <Link to="/signin" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-3" />
            <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
              Log in/Sign up
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;