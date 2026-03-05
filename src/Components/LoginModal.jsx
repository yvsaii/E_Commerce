import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import './LoginModal.css';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const LoginModal = ({ isOpen, onClose, onLoginSuccess, pendingProduct }) => {
  const { login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};

    if (isRegisterMode) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isRegisterMode) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isRegisterMode) {
        const result = register(formData.name, formData.email, formData.password);
        if (result.success) {
          setSuccessMessage('Registration successful! Redirecting...');
          setTimeout(() => {
            handleSuccess();
          }, 1000);
        } else {
          setApiError(result.message);
        }
      } else {
        const result = login(formData.email, formData.password);
        if (result.success) {
          handleSuccess();
        } else {
          setApiError(result.message);
        }
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setApiError('');
    setSuccessMessage('');
    onLoginSuccess(pendingProduct);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setApiError('');
    setSuccessMessage('');
    setIsRegisterMode(false);
    onClose();
  };

  const switchMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setErrors({});
    setApiError('');
    setSuccessMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={handleClose} aria-label="Close">
          <CloseIcon />
        </button>

        <h2>{isRegisterMode ? 'Create Account' : 'Welcome Back'}</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {apiError && (
          <div className="error-message" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {apiError}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="validation-error">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="validation-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="validation-error">{errors.password}</span>}
          </div>

          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="validation-error">{errors.confirmPassword}</span>}
            </div>
          )}

          <button 
            type="submit" 
            className={isRegisterMode ? 'register-button' : 'login-button'}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (isRegisterMode ? 'Register' : 'Login')}
          </button>
        </form>

        <div className="login-switch">
          {isRegisterMode ? (
            <>
              Already have an account? 
              <button type="button" onClick={switchMode}>Login here</button>
            </>
          ) : (
            <>
              New user? 
              <button type="button" onClick={switchMode}>Register here</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

