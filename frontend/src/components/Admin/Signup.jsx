import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../server';


const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    axios
      .post(`${server}/auth/sign-up`, { fullName, email, contactNumber, password },{
        withCredentials: true,
      })
      .then((res) => {
        setFullName("");
        setEmail("");
        setContactNumber("");
        setPassword("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="bg-white p-8 rounded shadow-md relative"
        style={{ width: '600px', maxWidth: '90%', height: 'auto', maxHeight: '90%' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="fullName"
              className="text-gray-600 absolute -top-3.5 left-3 transition-all transform origin-left scale-75"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className="text-gray-600 absolute -top-3.5 left-3 transition-all transform origin-left scale-75"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="contactNumber"
              className="text-gray-600 absolute -top-3.5 left-3 transition-all transform origin-left scale-75"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="text-gray-600 absolute -top-3.5 left-3 transition-all transform origin-left scale-75"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup
