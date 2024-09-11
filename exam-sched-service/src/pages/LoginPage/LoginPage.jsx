import React, { useState, useEffect } from 'react';
import loginBackground from '/images/LoginBackground.png';
import axios from 'axios'; // Make sure axios is installed and imported
import { useSession } from '../../components/SessionContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  
   // Get the CSRF token and user-related functions from the SessionContext
  const { csrfToken, setUser, isTabletOrMobile, user, loading } = useSession();

  // Swaps between Login versus Sign Up side of the form
  const toggleActive = () => {
    setIsLoginActive(!isLoginActive);
    document.activeElement.blur();
  };

  // USE EFFECT THAT IF A USER IS SIGNED IN, REDIRECT TO THE HOME PAGE ------------------------------
  // Checkbox to extend user login time (stay signed in)

  // Toggles user's ability to see their entered password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        '/api/users/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csrfToken // Include the CSRF token in the header
          }
        }
      );
      if (response.status === 200) {
        // Redirect to the landing page
        window.location.href = '/';
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleSignUp = async () => {
    // Check if email ends with @ucsc.edu
    if (!email.endsWith('@ucsc.edu')) {
      setMessage2('Invalid Email: please enter a valid UCSC email and try again');
      return; // Exit early without making the API request
    }

    try {
      const response = await axios.post(
        '/api/users/register',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
      if (response.status === 201) {
        // BE careful of this line!
        //setUser(response.data.user);  // Set the user in session context
        window.location.href = '/';
      }
    } catch (error) {
      setMessage2(error.response.data.message);
    }
  }

  if(!isTabletOrMobile){
    return (
      <div className="flex flex-col items-center min-h-screen pt-16">
      {/* Header Text */}
      <div className="text-center text-topNavBlue mt-10">
        <h1 className="text-6xl font-bold">UCSC Scheduling Tool</h1>
        <p className="text-2xl mt-3">Planning your courses and exams, made easy!</p>
      </div>

      {/* Login/Sign-Up Container */}
      <div className="relative w-[900px] h-[640px] bg-cover bg-center mt-10" style={{ backgroundImage: `url(${loginBackground})` }}>
        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-blue-600 opacity-40" />

        {/* Blue Rectangle */}
        <div className={`absolute w-1/2 h-full bg-topNavBlue transition-all duration-500 ease-in-out ${isLoginActive ? 'left-0' : 'left-1/2'}`} />

        {/* Circular Toggle Button */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <button
            onClick={toggleActive}
            className="pointer-events-auto w-12 h-12 bg-topNavBlue rounded-full flex justify-center items-center text-white text-xl hover:bg-blue-600 hover:border-2 hover:border-white transition-colors duration-300 z-10"
          >
            <span className={`transform transition-transform duration-300 ${isLoginActive ? 'rotate-0' : 'rotate-180'}`}>&#x25B6;</span>
          </button>
        </div>

        {/* Login Form */}
        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center p-6 transition-opacity duration-500 ease-in-out ${isLoginActive ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
          <h2 className="text-4xl font-semibold mb-4 text-white">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-3/4 p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isLoginActive}
          />
          <div className="relative w-3/4 mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isLoginActive}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={isLoginActive ? togglePasswordVisibility : null}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <button
            className="w-2/4 p-2 mt-4 bg-LogButtonBlue text-white border-2 border-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={isLoginActive ? handleLogin : null}
          >
            Proceed
          </button>
          {message && <p className="text-red-500 mt-4 text-center flex items-center justify-center">{message}</p>}
        </div>

        {/* Sign-Up Form */}
        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center p-6 transition-opacity duration-500 ease-in-out ${isLoginActive ? 'opacity-0 pointer-events-none invisible' : 'opacity-100 pointer-events-auto visible'}`} style={{ left: '50%' }}>
          <h2 className="text-4xl font-semibold mb-4 text-white">Account Registration</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-3/4 p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginActive}
          />
          <div className="relative w-3/4 mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoginActive}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={isLoginActive ? null : togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <p className="text-xs text-white text-center mt-2 mb-4">
            By creating an account above, I hereby agree to IMPG’s terms and services along with anything else covered in the <a href="https://example.com/privacy-policy" className="underline">Privacy Policy and Data Transparency Agreement</a>.
          </p>
          <button
            className="w-2/4 p-2 mt-4 bg-LogButtonBlue text-white border-2 border-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={isLoginActive ? null : handleSignUp}
          >
            Create Account
          </button>
          {message2 && <p className="text-red-500 mt-4 text-center flex items-center justify-center">{message2}</p>}
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-white">
    {/* Header Text */}
    <div className="text-center text-topNavBlue mb-4 w-full mt-20">
      <h1 className="text-4xl font-bold text-blue-900">UCSC Scheduling Tool</h1>
      <p className="text-lg mt-2 text-gray-700">Planning your courses and exams, made easy!</p>
    </div>

    {/* Toggle Buttons for Mobile */}
    <div className="flex justify-center space-x-4 mb-4 w-full max-w-md">
      <button
        className={`flex-1 px-4 py-2 text-lg font-medium rounded-lg shadow-md transition ${
          isLoginActive ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'
        }`}
        onClick={() => setIsLoginActive(true)}
        disabled={isLoginActive}
      >
        Login
      </button>
      <button
        className={`flex-1 px-4 py-2 text-lg font-medium rounded-lg shadow-md transition ${
          isLoginActive ? 'bg-white text-blue-600 border border-blue-600' : 'bg-blue-600 text-white'
        }`}
        onClick={() => setIsLoginActive(false)}
        disabled={!isLoginActive}
      >
        Register
      </button>
    </div>

    {/* Form Container */}
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {isLoginActive ? (
        <div>
          {/* Login Form */}
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <button
            className="w-full p-2 mt-3 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            onClick={handleLogin}
          >
            Proceed
          </button>
          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        </div>
      ) : (
        <div>
          {/* Registration Form */}
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <p className="text-xs text-gray-600 text-center mb-4">
            By creating an account, you agree to our <a href="https://example.com/privacy-policy" className="underline">Privacy Policy</a>.
          </p>
          <button
            className="w-full p-2 mt-3 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            onClick={handleSignUp}
          >
            Create Account
          </button>
          {message2 && <p className="text-red-500 mt-4 text-center">{message2}</p>}
        </div>
      )}
    </div>
  </div>
  )
};

export default LoginPage;
