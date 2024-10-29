import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Destructure login from context
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const success = login({ email, password }); // You might want to modify this to return success
    if (success) {
      navigate("/events");
    }
  };

  return (
    <div className="h-screen w-full p-0 m-0 overflow-hidden flex justify-center items-center">
      <div
        className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
        style={{ animation: 'slideInFromLeft 1s ease-out' }}
      >
        <h2
          className="text-center text-4xl font-extrabold text-white"
          style={{ animation: 'appear 2s ease-out' }}
        >
          Welcome
        </h2>
        <p className="text-center text-gray-200" style={{ animation: 'appear 3s ease-out' }}>
          Sign in to your account
        </p>
        <form method="POST" action="#" className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <input
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required // Add required attribute for email input
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="email" // Change 'for' to 'htmlFor'
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required // Add required attribute for password input
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="password" // Change 'for' to 'htmlFor'
            >
              Password
            </label>
          </div>
          <button
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit" // Keep this type as submit
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
