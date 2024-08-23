import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from '../../components/SessionContext.jsx';

const TwoFVerifyPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

   // Get the CSRF token and user-related functions from the SessionContext
   const { csrfToken, setUser } = useSession();

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/verify-email',
        { verificationCode },
        {
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csrfToken // Include the CSRF token in the header
          }
        }
      );
      if (response.status === 201) {
        // Redirect to a page (e.g., the home page) upon successful verification
        window.location.href = '/';
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-16">
      <h1 className="text-4xl font-bold mb-6">Email Verification</h1>
      <p className="mb-4">Please enter the verification code sent to your email.</p>
      <input
        type="text"
        placeholder="Verification Code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="w-1/2 p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleVerification}
        className="w-1/4 p-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Verify
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default TwoFVerifyPage;
