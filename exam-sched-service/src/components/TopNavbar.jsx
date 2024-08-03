import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  const handleLogoClick = () => {
    window.location.href = 'https://www.ucsc.edu/'; // Replace with your desired URL
  };

  // TO DO: Find better resolution image for top left
  // Finish about page and handle routing
  // Finish page itsel
  return (
    <nav className="bg-topNavBlue text-white p-4 fixed w-full top-0 z-20 flex items-center justify-between">
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        
        <img
          src="/images/WhiteTopLogo.png"
          alt="Logo"
          className="h-8 w-50 mr-2 transition-transform transform hover:scale-110"
        />
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="text-white 
        relative 
        after:content-[''] 
        after:block 
        after:w-full 
        after:h-0.5 
        after:bg-topNavYellow
        after:absolute 
        after:bottom-0 
        after:left-0 
        after:scale-x-0 
        hover:after:scale-x-100 
        after:transition-transform 
        after:duration-300
        hover:text-white">Home</Link>
        <Link to="/about" className="text-white 
        relative 
        after:content-[''] 
        after:block 
        after:w-full 
        after:h-0.5 
        after:bg-topNavYellow
        after:absolute 
        after:bottom-0 
        after:left-0 
        after:scale-x-0 
        hover:after:scale-x-100 
        after:transition-transform 
        after:duration-300
        hover:text-white">About</Link>
      </div>
    </nav>
  );
};

export default TopNavbar;