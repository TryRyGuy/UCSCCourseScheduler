import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faShoppingCart, faGraduationCap, faCalendarAlt, faBars  } from '@fortawesome/free-solid-svg-icons';
import { useSession } from './SessionContext.jsx';
import axios from 'axios';

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('fall'); // Initial term is set to 'fall'
  const { user, setUser, csrfToken, schedules, classCounts, loading} = useSession();
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

  // Function to handle term selection
  const handleTermChange = (term) => {
    setSelectedTerm(term);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen); // Toggle sidebar visibility
  };

  useEffect(() => {
    // Effect to trigger re-render whenever classCounts changes
  }, [classCounts]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMobileSidebar} 
        className="fixed bottom-4 left-4 bg-sideNavGrey1 text-white p-2 rounded-full shadow-lg lg:hidden"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Sidebar for large and medium screens */}
      <div
        className={`bg-sideNavGrey1 h-screen fixed top-0 left-0 z-10 transition-all duration-300 flex flex-col justify-between pt-16 
        ${isHovered ? 'w-86' : 'w-16'} hidden lg:flex`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Only render content after loading is complete */}
        {!loading && (
          <>
            {/* Shopping Cart Icon at the Top with Class Count */}
            <div className="relative flex flex-col items-start mt-4 space-y-4 pl-4">
              <div className="text-black p-0 w-full flex items-center">
                <FontAwesomeIcon icon={faShoppingCart} size="2x" className="mr-2" />
                {isHovered && (
                  <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-sm">
                    {classCounts[selectedTerm] || 0} 
                  </span>
                )}
              </div>
            </div>

            {/* Dropdown Menu for Term Selection */}
            {isHovered && (
              <div className="absolute left-full top-16 mt-2 w-32 bg-white shadow-lg rounded-md z-10 p-2">
                {['Fall', 'Winter', 'Spring', 'Summer'].map((term) => (
                  <div 
                    key={term}
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedTerm === term ? 'font-bold' : ''}`}
                    onClick={() => handleTermChange(term)}
                  >
                    {term}
                  </div>
                ))}
              </div>
            )}

            <div className="flex-grow"></div> {/* Spacer to push content to the bottom */}

            {/* Sidebar Links */}
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
              {user && (
                <Link to="/settings" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
                  <FontAwesomeIcon icon={faCog} size="2x" className="mr-3" />
                  <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
                    Settings
                  </span>
                </Link>
              )}
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
                    style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
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
          </>
        )}
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`bg-sideNavGrey1 h-full fixed top-0 z-20 transition-transform duration-300 flex flex-col justify-center items-center space-y-4 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
      >
        {!loading && (
          <>
            <div className="text-black p-0 flex flex-col items-center space-y-4">
              <FontAwesomeIcon icon={faShoppingCart} size="2x" className="mr-2" />
              <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm">
                {classCounts[selectedTerm] || 0}
              </span>
            </div>

            <a href="https://catalog.ucsc.edu/" className="text-black p-0 hover:bg-customBlue w-full text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faGraduationCap} size="2x" className="mr-2" />
              <span className="ml-2">Course Catalog</span>
            </a>
            <Link to="/checkout" className="text-black p-1 hover:bg-customBlue w-full text-center flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="mr-4" />
              <span className="ml-2">Planning Tool</span>
            </Link>
            {user && (
              <Link to="/settings" className="text-black p-1 hover:bg-customBlue w-full text-center flex items-center justify-center">
                <FontAwesomeIcon icon={faCog} size="2x" className="mr-3" />
                <span className="ml-2">Settings</span>
              </Link>
            )}
            {user ? (
              <div className="flex items-center w-full p-1 justify-center">
                <div
                    className="mr-3 bg-white text-black rounded-full flex items-center justify-center"
                    style={{ width: '34px', height: '34px', minWidth: '34px', minHeight: '34px', fontSize: '1.2rem', fontWeight: 'bold' }}
                  >
                  {user.email.slice(0, 2).toUpperCase()}
                </div>
                <span
                  className="font-semibold text-black cursor-pointer hover:text-hoverLogout"
                  onClick={handleLogout}
                >
                  Log Out
                </span>
              </div>
            ) : (
              <Link to="/signin" className="text-black p-1 hover:bg-customBlue w-full text-center flex items-center justify-center">
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-3" />
                <span className="ml-2">Log in/Sign up</span>
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SideNavbar;