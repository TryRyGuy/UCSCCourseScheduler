import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faGraduationCap, faCalendarAlt, faBell, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useSession } from './SessionContext.jsx';

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('fall');
  const { classCounts, loading, isTabletOrMobile} = useSession();

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleTermChange = (term) => {
    setSelectedTerm(term);
  };

  if (!isTabletOrMobile) {
    // Standard sidebar for larger screens
    return (
      <div
        className={`bg-sideNavGrey1 h-screen fixed top-0 left-0 z-10 transition-all duration-300 flex flex-col justify-between pt-16 ${
          isHovered ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!loading && (
          <>
            {/* Shopping Cart Icon with Class Count */}
            <div
              className={`relative flex flex-col items-start mt-4 space-y-4 pl-4 ${
                isHovered ? '' : 'pointer-events-none'
              }`}
            >
              <div className="text-black p-0 w-full flex items-center">
                <FontAwesomeIcon icon={faShoppingCart} size="2x" className="mr-2" />
                {isHovered && (
                  <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-sm">
                    {classCounts[selectedTerm] || 0} {/* Show class count for the selected term */}
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
                    className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                      selectedTerm === term ? 'font-bold' : ''
                    }`}
                    onClick={() => handleTermChange(term)}
                  >
                    {term}
                  </div>
                ))}
              </div>
            )}

            <div className="flex-grow"></div> {/* Spacer to push content to the bottom */}

            <div
              className={`flex flex-col items-start mb-4 space-y-4 pl-4 ${
                isHovered ? '' : 'pointer-events-none'
              }`}
            >
              <a href="https://catalog.ucsc.edu/" className="text-black p-0 hover:bg-customBlue w-full text-left flex items-center">
                <FontAwesomeIcon icon={faGraduationCap} size="2x" className="mr-2" />
                <span
                  className={`transition-opacity duration-300 ${
                    isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'
                  } ml-2 whitespace-nowrap`}
                >
                  Course Catalog
                </span>
              </a>
              <Link to="/checkout" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="mr-4" />
                <span
                  className={`transition-opacity duration-300 ${
                    isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'
                  } ml-2 whitespace-nowrap`}
                >
                  Planning Tool
                </span>
              </Link>
              <Link to="/exam-reminders" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
                <FontAwesomeIcon icon={faBell} size="2x" className="mr-4" />
                <span
                  className={`transition-opacity duration-300 ${
                    isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'
                  } ml-2 whitespace-nowrap`}
                >
                  Exam Reminders
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }

  // Sidebar Button for Tablet and Mobile Screens
  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-20 bg-topNavBlue text-white p-4 rounded-full shadow-lg focus:outline-none transition-transform duration-500 ease-in-out"
        onClick={toggleMobileSidebar}
      >
        <FontAwesomeIcon
          icon={faCaretUp}
          className={`text-white transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Vertical Menu - Buttons slide up from below */}
      <div
        className={`fixed bottom-20 left-4 z-20 flex flex-col items-start space-y-4 transition-all duration-500 ease-in-out ${
          isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {isMobileOpen && (
          <>
            <Link to="https://catalog.ucsc.edu" className="bg-blue-500 text-white p-2 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-blue-600 flex items-center" onClick={() => setIsMobileOpen(false)}>
              <FontAwesomeIcon icon={faGraduationCap} size="lg" className="mr-2" />
              <span>Course Catalog</span>
            </Link>
            <Link to="/checkout" className="bg-blue-500 text-white p-2 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-blue-600 flex items-center" onClick={() => setIsMobileOpen(false)}>
              <FontAwesomeIcon icon={faCalendarAlt} size="lg" className="mr-2" />
              <span>Planning Tool</span>
            </Link>
            <Link to="/exam-reminders" className="bg-blue-500 text-white p-2 rounded-full shadow-lg transform transition-all duration-500 hover:scale-110 hover:bg-blue-600 flex items-center" onClick={() => setIsMobileOpen(false)}>
              <FontAwesomeIcon icon={faBell} size="lg" className="mr-2" />
              <span>Exam Reminders</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default SideNavbar;