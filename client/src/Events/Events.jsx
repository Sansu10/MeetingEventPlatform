import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';         
import { eventsService } from '../services/events.service';  
import { useNavigate } from 'react-router-dom';
import './Events.css';
import CreateEvent from '../create/CreateEvent'; // Import the CreateEvent component

// Remove the showCreateModal state and CreateEvent import
// Update the button handlers to use navigation

const Events = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);  // Added modal state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsService.getEvents();
        setEvents(data.events);
      } catch (error) {
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          navigate('/signin');
        } else {
          setError('Error fetching events: ' + error.message);
        }
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user?.category, navigate]);

  if (!user) {
    return <div className="error-message">Please log in to view events</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleCreateEvent = (eventData) => {
    console.log('Event Data:', eventData);  // For testing
    setShowCreateModal(false);   // Close modal after creating event
  };

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  const handleCreateClick = () => {
    navigate('/create-event');
  };

  return (
    <div className="events-page">
      <div className="sidebar">
        <div className="logo">
          <span className="logo-text">CNNCT</span>
        </div>
        <nav>
          <ul>
            <li className="active">Events</li>
            <li onClick={() => navigate('/booking')}>Booking</li>
            <li>Availability</li>
            <li onClick={() => navigate('/settings')}>Settings</li>
          </ul>
        </nav>
        <div className="bottom-section">
          <button 
            className="create-button" 
            onClick={handleCreateClick}
          >
            <span>+</span> Create
          </button>
          <div className="user-profile">
            <img 
              src={user?.avatar || '/default-avatar.png'} 
              alt="User" 
            />
            <span>{user?.firstName || 'User'} {user?.lastName || ''}</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div>
            <h1>Event Types</h1>
            <p>Create events to share for people to book on your calendar.</p>
          </div>
          <button 
            className="add-event-button" 
            onClick={handleCreateClick}
          >
            + Add New Event
          </button>
        </div>

        <div className="events-grid">
          {loading ? (
            <div>Loading...</div>
          ) : (
            events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <button className="edit-button">✏️</button>
                </div>
                <div className="event-time">
                  <p>{event.date}</p>
                  <p>{event.startTime} - {event.endTime}</p>
                </div>
                <div className="event-footer">
                  <span className="event-status">
                    {event.status === 'active' ? '🟢' : '⚫️'}
                  </span>
                  <div className="event-actions">
                    <button>📋</button>
                    <button>🗑️</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Render the CreateEvent modal */}
      {showCreateModal && (
        <CreateEvent 
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateEvent}
        />
      )}
    </div>
  );
};

export default Events;
