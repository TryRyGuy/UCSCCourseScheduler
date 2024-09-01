import React, { useContext  } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../components/SessionContext.jsx';

const LandingPage = () => {
  const { user, loading } = useSession(); // Get user and loading states from context

  // Don't render the component until the session check is complete
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-4 pb-12"> {/* Reduced top padding further */}
      <div className="text-center max-w-2xl mt-2"> {/* Added margin-top to control spacing */}
        <img
          src="/images/SchoolLogo.png"
          alt="Logo"
          className="w-80 h-80 min-w-[80px] min-h-[80px] mx-auto mb-10"
        />
        <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Your gateway to a well planned learning experience.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center">
          {!user && (
            <Link to="/signin">
              <button className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                Log In
              </button>
            </Link>
          )}
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