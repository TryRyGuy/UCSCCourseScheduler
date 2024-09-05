import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faSignOutAlt, faCaretDown, faCaretUp, faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const TopNavbar = () => {
  const { user, setUser, csrfToken, loading, isMobile } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    window.location.href = 'https://www.ucsc.edu/';
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        '/api/users/logout',
        {},
        {
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csrfToken, // Include the CSRF token in the header
          },
        }
      );
      setUser(null); // Clear the session in context
      setIsDropdownOpen(false); // Close dropdown after logging out
      setIsMenuOpen(false); // Close mobile menu after logging out
      navigate('/'); // Redirect to the landing page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <nav className="bg-topNavBlue text-white px-4 py-2 fixed w-full top-0 z-20 flex items-center justify-between">
      {/* Left side: Logo */}
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <img
          src="/images/WhiteTopLogo.png"
          alt="Logo"
          className="h-8 w-50 mr-2 transition-transform transform hover:scale-110"
        />
      </div>

      {/* Right side: Navigation Links and User/Auth Controls for larger screens */}
      <div className="flex-grow hidden md:flex space-x-4 items-center justify-end">
        <Link to="/" className="text-white relative after:content-[''] after:block after:w-full after:h-0.5 after:bg-topNavYellow after:absolute after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-white">
          Home
        </Link>
        <Link to="/about" className="text-white relative after:content-[''] after:block after:w-full after:h-0.5 after:bg-topNavYellow after:absolute after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-white">
          About
        </Link>
        <Link to="/usage" className="text-white relative after:content-[''] after:block after:w-full after:h-0.5 after:bg-topNavYellow after:absolute after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-white">
          Help
        </Link>

        {/* Dropdown User/Auth Controls (For medium sized windows and above) */}
        {!loading && (
          user ? (
            <div className="relative">
              {/* User Icon with Dropdown */}
              <button
                className="flex items-center focus:outline-none bg-gray-300 border-2 border-topNavYellow rounded-md px-2 py-1 text-white hover:bg-blue-500 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="text-black bg-white rounded-full flex items-center justify-center mr-2" style={{ width: '28px', height: '28px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {user.email.slice(0, 2).toUpperCase()}
                </div>
                <FontAwesomeIcon icon={isDropdownOpen ? faCaretUp : faCaretDown} size="sm" className="text-white" />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={ () => {handleSettingsClick(); setIsDropdownOpen(false);}}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={ () => {handleLogout(); setIsDropdownOpen(false);}}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Login/Signup Button
            <Link to="/signin" className="bg-white text-topNavBlue px-2 py-2 rounded-md hover:bg-topNavYellow transition" onClick={() => setIsDropdownOpen(false)}>
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              Login/Signup
            </Link>
          )
        )}
      </div>

      {/* Mobile Menu Button for mobile/small screens */}
      <div className="md:hidden relative">
        <button
          className="bg-topNavBlue border-2 border-white px-2 py-1 rounded focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="text-white"/>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-topNavBlue shadow-md z-10 overflow-hidden transition-max-height duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <div className={`transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <hr className="border-t-2 border-white mx-2" />
        </div>
        <Link to="/" className="block text-white py-2 hover:bg-topNavYellow w-full text-center" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" className="block text-white py-2 hover:bg-topNavYellow w-full text-center" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
        <Link to="/usage" className="block text-white py-2 hover:bg-topNavYellow w-full text-center" onClick={() => setIsMenuOpen(false)}>
          Help
        </Link>
        {!loading && (
          user ? (
            <>
              <button
                onClick={ () => {handleSettingsClick(); setIsMenuOpen(false);}}
                className="block w-full text-center text-white bg-topNavBlue py-2 hover:bg-topNavYellow"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </button>
              <button
                onClick={ () => {handleLogout(); setIsMenuOpen(false);}}
                className="block w-full text-center text-white bg-topNavBlue py-2 hover:bg-topNavYellow"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/signin" className="block text-white py-2 bg-topNavBlue hover:bg-topNavYellow w-full text-center" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              Login/Signup
            </Link>
          )
        )}
      </div>
    </nav>
  );
    
};

export default TopNavbar;