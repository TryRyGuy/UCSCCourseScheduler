import React, { useState } from 'react';
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
  const { csrfToken, setUser } = useSession();

  // Swaps between Login versus Sign Up side of the form
  const toggleActive = () => {
    setIsLoginActive(!isLoginActive);
    document.activeElement.blur();
  };

  // Toggles user's ability to see their entered password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
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
        'http://localhost:5000/api/users/register',
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

  return (
    <div className="flex flex-col items-center min-h-screen pt-16 pl-16">
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
        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center p-6 transition-opacity duration-500 ease-in-out ${isLoginActive ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-semibold mb-4 text-white">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-3/4 p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-3/4 mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
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
            className="w-2/4 p-2 mt-4 bg-LogButtonBlue text-white border-2 border-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={handleLogin}
          >
            Proceed
          </button>
          {message && <p className="text-red-500 mt-4 text-center flex items-center justify-center">{message}</p>}
        </div>

        {/* Sign-Up Form */}
        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center p-6 transition-opacity duration-500 ease-in-out ${isLoginActive ? 'opacity-0' : 'opacity-100'}`} style={{ left: '50%' }}>
          <h2 className="text-4xl font-semibold mb-4 text-white">Account Registration</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-3/4 p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-3/4 mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
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
          <p className="text-xs text-white text-center mt-2 mb-4">
            By creating an account above, I hereby agree to IMPG’s terms and services along with anything else covered in the <a href="https://example.com/privacy-policy" className="underline">Privacy Policy and Data Transparency Agreement</a>.
          </p>
          <button
            className="w-2/4 p-2 mt-4 bg-LogButtonBlue text-white border-2 border-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={handleSignUp}
          >
            Create Account
          </button>
          {message2 && <p className="text-red-500 mt-4 text-center flex items-center justify-center">{message2}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
