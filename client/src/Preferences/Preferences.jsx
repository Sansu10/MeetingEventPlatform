import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Preferences.css';  // Add this import

const Preferences = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Short delay before navigation to show the selection
    setTimeout(() => {
      navigate('/events');
    }, 300);
  };

  const categories = [
    { id: 'sales', name: 'Sales', icon: '🏠' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'government', name: 'Government & Politics', icon: '🏛️' },
    { id: 'consulting', name: 'Consulting', icon: '💼' },
    { id: 'recruiting', name: 'Recruiting', icon: '📋' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
  ];

  const handleContinue = async () => {
    if (!username || !selectedCategory) {
      alert('Please fill in your username and select a category');
      return;
    }
    try {
      // Save preferences logic here if needed
      console.log('Form submitted:', { username, selectedCategory });
      // Navigate to events page after saving preferences
      navigate('/events');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <div className="preferences-container">
      <div className="logo">
        <span className="logo-text">CNNCT</span>
      </div>
      
      <div className="preferences-content">
        <h1>Your Preferences</h1>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Tell us your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="category-section">
          <p>Select one category that best describes your CNNCT:</p>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          className="continue-button"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Preferences;