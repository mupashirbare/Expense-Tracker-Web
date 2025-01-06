import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), // Ensure `email` is defined
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message || 'Something went wrong');
        return;
      }
  
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error.message || 'Request failed');
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>{message}</p>
          </div>
        )}
      </div>  
    </div>
  );
};

export default ForgetPassword;
