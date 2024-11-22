import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth-store"; // Import Zustand store
import { X } from 'lucide-react';
import validateRegister from "../utils/validator"; // Import validator



const MainNav = () => {
  const navigate = useNavigate();
  const actionLogin = useAuthStore((state) => state.actionLogin);
  const actionRegister = useAuthStore((state) => state.actionRegister);
  
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [formErrors, setFormErrors] = useState({});

  // Login Popup Handlers
  const handleLoginClick = () => setIsLoginPopupOpen(true);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);

  // Register Popup Handlers
  const handleRegisterClick = () => setIsRegisterPopupOpen(true);
  const handleCloseRegisterPopup = () => setIsRegisterPopupOpen(false);

  const handleLoginOnChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterOnChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const role = await actionLogin(loginForm);
    roleRedirect(role);
  };

  const roleRedirect = (role) => {
    if (role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
    setIsLoginPopupOpen(false); // Close the popup after login
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const error = validateRegister(registerForm);
    if (error) {
      return setFormErrors(error);
    }
    actionRegister(registerForm);
    setRegisterForm({ email: '', password: '', confirmPassword: '' });
    setFormErrors({});
    setIsRegisterPopupOpen(false); // Close the popup after registration
  };

  return (
    <>
      <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
          <a className="text-2xl font-bold text-green-600">Toilet CodeCamp18</a>
          <div className="flex items-center space-x-4">
            <Link className="text-gray-700 hover:text-green-600 transition duration-300" to="/">HOME</Link>
            <Link className="text-gray-700 hover:text-green-600 transition duration-300" to="/about">ABOUT</Link>
            <button 
              onClick={handleRegisterClick}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300">
              Register
            </button>
            <button 
              onClick={handleLoginClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Login</h2>
              <button onClick={handleCloseLoginPopup} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginOnChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded shadow"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginOnChange}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded shadow"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Popup */}
      {isRegisterPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Register</h2>
              <button onClick={handleCloseRegisterPopup} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterOnChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded shadow"
                  required
                />
                {formErrors.email && (
                  <span className="text-red-500">{formErrors.email}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterOnChange}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded shadow"
                  required
                />
                {formErrors.password && (
                  <span className="text-red-500">{formErrors.password}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterOnChange}
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border rounded shadow"
                  required
                />
                {formErrors.confirmPassword && (
                  <span className="text-red-500">{formErrors.confirmPassword}</span>
                )}
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNav;
