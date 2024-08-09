import React, { useState, useEffect} from 'react';
import loginBackground from '/images/LoginBackground.png';
import axios from 'axios'; // Make sure axios is installed and imported

const LoginPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [csurfToken, setCsurfToken] = useState('');

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/csrf-token', { withCredentials: true });
        console.log('Fetched CSRF Token:', response.data.csrfToken);
        setCsurfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  // Log CSRF token updates
  useEffect(() => {
    console.log('Updated CSRF Token:', csurfToken);
  }, [csurfToken]);


  const toggleActive = () => {
    setIsLoginActive(!isLoginActive);
    document.activeElement.blur();
  };

  const handleLogin = async () => {
    console.log( csurfToken);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csurfToken // Include the CSRF token in the header
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
          <input
            type="password"
            placeholder="Password"
            className="w-3/4 p-2 mb-4 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-2/4 p-2 mt-4 bg-LogButtonBlue text-white border-2 border-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={handleLogin}
          >
            Proceed
          </button>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>

        {/* Sign-Up Form */}
        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center p-6 transition-opacity duration-500 ease-in-out ${isLoginActive ? 'opacity-0' : 'opacity-100'}`} style={{ left: '50%' }}>
          <h2 className="text-4xl font-semibold mb-4 text-white">Account Registration</h2>
          <input type="email" placeholder="Email" className="w-3/4 p-2 mb-4 border border-gray-300 rounded" />
          <input type="password" placeholder="Password" className="w-3/4 p-2 mb-4 border border-gray-300 rounded" />
          <p className="text-xs text-white text-center mt-2 mb-4">
            By creating an account above, I hereby agree to IMPG’s terms and services along with anything else covered in the <a href="https://example.com/privacy-policy" className="underline">Privacy Policy and Data Transparency Agreement</a>.
          </p>
          <button className="w-2/4 p-2 mt-4 bg-LogButtonBlue text-white border-2 border-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
