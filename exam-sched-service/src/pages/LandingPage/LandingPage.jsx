import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <img src="/images/NannerSlugLogo2.png" alt="Logo" className="w-80 h-80 mx-auto mb-10" />
        <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">Welcome to Our Platform</h1>
        <p className="text-xl text-gray-600 mb-10">
          Your gateway to a well planned learning experience.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center">
          <Link to="/signin">
            <button className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Log In
            </button>
          </Link>
          <Link to="/browse-classes">
            <button className="px-8 py-3 bg-topNavYellow text-white text-lg font-medium rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
              Browse Classes
            </button>
          </Link>
        </div>
      </div>

      {/* New Section for Usage Page */}
      <div className="mt-20 w-full max-w-3xl bg-white p-10 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">New to Our Service?</h2>
        <p className="text-lg text-gray-600 mb-10">
          For first-time users, we suggest you visit our usage page for a brief tutorial to learn how to take full advantage of the tools and aides we offer.
        </p>
        <Link to="/usage">
          <button className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Go to Usage Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;