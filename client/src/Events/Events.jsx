import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';         
import { eventsService } from '../services/events.service';  
import { useNavigate } from 'react-router-dom';
import './Events.css';
import CreateEvent from '../create/CreateEvent'; // Import the CreateEvent component
import { format } from 'date-fns'; // Add this import

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

  const formatEventTime = (startTime, endTime) => {
    return `${format(new Date(startTime), 'h:mm a')} - ${format(new Date(endTime), 'h:mm a')}`;
  };

  const handleStatusToggle = async (eventId) => {
    try {
      const eventToUpdate = events.find(event => event._id === eventId);
      const newStatus = eventToUpdate.status === 'active' ? 'inactive' : 'active';
      
      // Update in the backend
      await eventsService.updateEventStatus(eventId, newStatus);
      
      // Update local state
      setEvents(events.map(event => 
        event._id === eventId 
          ? { ...event, status: newStatus }
          : event
      ));
    } catch (error) {
      console.error('Error updating event status:', error);
      // Optionally show error message to user
      setError('Failed to update event status');
    }
  };

  const handleEdit = (eventId) => {
    // Navigate to edit page with event ID
    navigate(`/create-event?edit=${eventId}`);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventsService.deleteEvent(eventId);
        // Remove event from local state
        setEvents(events.filter(event => event._id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
        setError('Failed to delete event');
      }
    }
  };

  // Update the event card buttons in the return statement
  return (
    <div className="events-page">
      <div className="sidebar">
        <div className="logo">
          <span className="logo-text">CNNCT</span>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate('/events')} className="active">Events</li>
            <li onClick={() => navigate('/booking')}>Booking</li>
            <li onClick={() => navigate('/availability')}>Availability</li>
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
                  <h2>{event.title}</h2>
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(event._id)}
                  >
                    <img src="/edit-icon.svg" alt="Edit" />
                  </button>
                </div>
                <div className="event-details">
                  <p className="event-date">
                    {format(new Date(event.dateTime), 'EEEE, dd MMM')}
                  </p>
                  <p className="event-time">
                    {formatEventTime(event.startTime, event.endTime)}
                  </p>
                  <p className="event-duration">{event.duration}hr, Group meeting</p>
                </div>
                <div className="event-footer">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={event.status === 'active'}
                      onChange={() => handleStatusToggle(event._id)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="event-actions">
                    <button className="action-button">
                      <img src="/copy-icon.svg" alt="Copy" />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => handleDelete(event._id)}
                    >
                      <img src="/delete-icon.svg" alt="Delete" />
                    </button>
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
