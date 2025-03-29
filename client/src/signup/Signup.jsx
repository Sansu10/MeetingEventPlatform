import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';
// import api from '../config/axios';
import api from '../config/axios.config'
// import './SignUp.css';
import './SignUp.css';
import Frame from '../assets/Frame.png';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      await authService.signup(formData);
      navigate('/preferences');
    } catch (error) {
      setError(error.response?.data?.message || 'Error during signup');
    }
  };

  return (
    <div className="page-layout">
      <div className="signup-container">
        <div className="logo">
          <span className="logo-text">CNNCT</span>
        </div>

        <div className="signup-content">
          <h1>Create an account</h1>
          <div className="signin-link">
            <a href="/signin">Sign in instead</a>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms">
                By creating an account, I agree to our{' '}
                <a href="/terms">Terms of use</a> and{' '}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="signup-button">
              Create an account
            </button>
          </form>

          <div className="terms">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </div>
        </div>
      </div>
      
      <div className="image-section">
        <img src={Frame} alt="Analytics Dashboard" />
      </div>
    </div>
  );
};

export default SignUp;