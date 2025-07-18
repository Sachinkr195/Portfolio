import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { setIsLoggedin, setAdmin,backendurl} = useContext(AppContext);

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${backendurl}/api/user/login`
      : `${backendurl}/api/user/register`;

    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await axios.post(url, payload, {
        withCredentials: true, // send cookies if using JWT in cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // On success
      setIsLoggedin(true);
      if (res.data.isAdmin) setAdmin(true);
      onClose();

    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong';
      alert(msg);
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-transparent border border-white text-white p-6 rounded-xl w-[90%] max-w-md relative shadow-2xl backdrop-blur-4xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white hover:text-red-400 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center bg-black bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex flex-col">
              <label htmlFor="name" className="text-md mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="p-2 rounded-md bg-white text-black border focus:outline-none"
                required
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="email" className="text-md mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 rounded-md bg-white text-black border focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-md mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="p-2 rounded-md bg-white text-black border focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mb-3 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:from-pink-500 hover:to-purple-500 transition"
          >
            {isLogin ? 'Log In' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="text-purple-400 underline hover:text-pink-400 transition"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
