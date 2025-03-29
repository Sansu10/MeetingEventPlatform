import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreateEvent.css';
import { eventsService } from '../services/events.service';  

// Add this function at the top of your component
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return slots;
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    eventTopic: '',
    password: '',
    hostName: user?.firstName + ' ' + user?.lastName || '',
    participants:[],
    description: '',
    date: '',
    time: '02:30',
    period: 'PM',
    timezone: '(UTC +5:00 Delhi)',
    duration: '1 hour'
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Prepare the event data
        const eventPayload = {
            title: eventData.eventTopic,
            description: eventData.description,
            dateTime: `${eventData.date}T${eventData.time}:00`,
            duration: parseInt(eventData.duration) * 60,   // Convert hours to minutes
            link: 'https://your-event-link.com',            // Replace with actual event link logic
            password: eventData.password,
            participants: eventData.participants,           // Include participant IDs if any
            bannerImage: '/default-banner.png',             // Replace with dynamic image logic
            backgroundColor: '#f0f0f0'                      // Add default background color
        };

        // Send the event data to the backend
        const response = await eventsService.createEvent(eventPayload);

        if (response.success) {
            console.log('Event created successfully:', response);
            alert('Event created successfully!');
            navigate('/events');   // Redirect to the events page
        } else {
            console.error('Failed to create event:', response.message);
            alert(`Failed to create event: ${response.message}`);
        }
    } catch (error) {
        console.error('Error creating event:', error);
        alert('Error creating event. Please try again.');
    }
};

  return (
    <div className="events-page">
      <div className="sidebar">
        <div className="logo">
          <span className="logo-text">CNNCT</span>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate('/events')}>Events</li>
            <li>Booking</li>
            <li>Availability</li>
            <li onClick={() => navigate('/settings')}>Settings</li>
          </ul>
        </nav>
        <div className="bottom-section">
          <div className="user-profile">
            <img src={user?.avatar || '/default-avatar.png'} alt="User" />
            <span>{user?.firstName || 'User'} {user?.lastName || ''}</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div>
            <h1>Create Event</h1>
            <p>Create events to share for people to book on your calendar.</p>
          </div>
        </div>

        <div className="create-event-container">
          <form onSubmit={handleSubmit} className="create-event-form">
            <h3 className="form-section-title">Add Event</h3>

            <div className="form-group">
              <label>Event Topic <span className="required">*</span></label>
              <input
                type="text"
                name="eventTopic"
                // placeholder="Set a conference topic before it starts"
                value={eventData.eventTopic}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                // placeholder="Password"
                value={eventData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Host name <span className="required">*</span></label>
              <input
                type="text"
                name="hostName"
                value={eventData.hostName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group datetime-group">
              <label>Date and time <span className="required">*</span></label>
              <div className="datetime-inputs">
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  required
                />
                <select name="time" value={eventData.time} onChange={handleChange}>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <select name="period" value={eventData.period} onChange={handleChange}>
                  <option>PM</option>
                  <option>AM</option>
                </select>
                <select name="timezone" value={eventData.timezone} onChange={handleChange}>
                  <option>(UTC +5:00 Delhi)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Set duration</label>
              <select name="duration" value={eventData.duration} onChange={handleChange}>
                <option>1 hour</option>
                <option>30 minutes</option>
                <option>2 hours</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => navigate('/events')}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;