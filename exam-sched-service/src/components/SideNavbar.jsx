import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faShoppingCart, faGraduationCap, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Link to="/settings" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
          <FontAwesomeIcon icon={faCog} size="2x" className="mr-3" />
          <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
            Settings
          </span>
        </Link>
        <Link to="/login" className="text-black p-1 hover:bg-customBlue w-full text-left flex items-center">
          <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-3" />
          <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0 delay-0'} ml-2 whitespace-nowrap`}>
            Log in/Sign up
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;

/*

<div className="bg-sideNavGrey1 h-screen fixed top-0 left-0 z-10 transform hover:w-64 w-16 transition-all duration-300 flex flex-col justify-between pt-16 group">
      
      <div className="flex flex-col items-start mt-4 space-y-4 pl-4">
        <div className="text-white p-2 w-full flex items-center">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" className="mr-2" />
          <span className="invisible group-hover:visible text-sideNavGrey1 group-hover:text-white transition-colors duration-300">Shopping</span>
        </div>
      </div>

      <div className="flex-grow"></div> 
      <div className="flex flex-col items-start mb-4 space-y-4 pl-4 min-w-[256px]">
        <a href="https://www.example.com" className="text-white p-2 hover:bg-customBlue w-full text-left transition-colors duration-300 flex items-center">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" className="mr-2" />
          <span className="invisible group-hover:visible text-sideNavGrey1 group-hover:text-white transition-colors duration-300">Course Catalog</span>
        </a>
        <Link to="/checkout" className="text-white p-2 hover:bg-customBlue w-full text-left transition-colors duration-300 flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="mr-2" />
          <span className="invisible group-hover:visible text-sideNavGrey1 group-hover:text-white transition-colors duration-300">Planning Tool</span>
        </Link>
        <Link to="/settings" className="text-white p-2 hover:bg-customBlue w-full text-left transition-colors duration-300 flex items-center">
          <FontAwesomeIcon icon={faCog} size="2x" className="mr-2" />
          <span className="invisible group-hover:visible text-sideNavGrey1 group-hover:text-white transition-colors duration-300">Settings</span>
        </Link>
        <Link to="/login" className="text-white p-2 hover:bg-customBlue w-full text-left transition-colors duration-300 flex items-center">
          <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-2" />
          <span className="invisible group-hover:visible text-sideNavGrey1 group-hover:text-white transition-colors duration-300">Log in/Sign up</span>
        </Link>
      </div>
    </div>

*/