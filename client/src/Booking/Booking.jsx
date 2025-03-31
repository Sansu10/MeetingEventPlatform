import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsService } from '../services/events.service';  
import './Booking.css';
import axios from 'axios';


const Booking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Upcoming');
  
  // Add sample booking data

  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: 'Friday, 23 feb',
      time: '1:30 pm - 2:30 pm',
      title: 'Meeting-2',
      description: 'You and team 2',
      status: 'Accepted',
      attendees: 13,
      type: 'Upcoming'
    },
    {
      id: 2,
      date: 'Monday, 26 feb',
      time: '3:00 pm - 4:00 pm',
      title: 'Project Review',
      description: 'Team discussion',
      status: 'Pending',
      attendees: 5,
      type: 'Pending'
    },
    {
      id: 3,
      date: 'Wednesday, 21 feb',
      time: '2:00 pm - 3:00 pm',
      title: 'Client Meeting',
      description: 'Product demo',
      status: 'Canceled',
      attendees: 8,
      type: 'Canceled'
    },
    {
      id: 4,
      date: 'Tuesday, 20 feb',
      time: '11:00 am - 12:00 pm',
      title: 'Team Sync',
      description: 'Weekly sync-up',
      status: 'Completed',
      attendees: 10,
      type: 'past'
    }
  ]);
  const [error, setError] = useState()

  const fetchEvents = async () => {
    try {
      const data = await eventsService.getEvents();
     console.log(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch events. Please try again later.');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => booking.type === activeTab);

  return (
    <div className="events-page">
      <div className="sidebar">
        <div className="logo">
          <span className="logo-text">CNNCT</span>
        </div>
        <nav>
          <ul>
            <li onClick={() => navigate('/events')}>Events</li>
            <li onClick={() => navigate('/booking')} className="active">Booking</li>
            <li onClick={() => navigate('/availability')}>Availability</li>
            <li onClick={() => navigate('/settings')}>Settings</li>
          </ul>
        </nav>
        <div className="bottom-section">
          <button className="create-button" onClick={() => navigate('/create-event')}>
            <span>+</span> Create
          </button>
          <div className="user-profile">
            <img src={user?.avatar || '/default-avatar.png'} alt="User" />
            <span>{user?.firstName || 'User'} {user?.lastName || ''}</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div>
            <h1>Booking</h1>
            <p>See upcoming and past events booked through your event type links.</p>
          </div>
        </div>

        <div className="booking-container">
          <div className="booking-tabs">
            <button 
              className={`tab-button ${activeTab === 'Upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('Upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`tab-button ${activeTab === 'Pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('Pending')}
            >
              Pending
            </button>
            <button 
              className={`tab-button ${activeTab === 'Canceled' ? 'active' : ''}`}
              onClick={() => setActiveTab('Canceled')}
            >
              Canceled
            </button>
            <button 
              className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              past
            </button>
          </div>

          <div className="booking-list">
            {filteredBookings.length === 0 ? (
              <div className="no-bookings">No {activeTab.toLowerCase()} bookings</div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-date">
                    <p>{booking.date}</p>
                    <p className="time">{booking.time}</p>
                  </div>
                  <div className="booking-details">
                    <h3>{booking.title}</h3>
                    <p>{booking.description}</p>
                  </div>
                  <div className="booking-status">
                    <span className="status-badge">{booking.status}</span>
                    <span className="attendees">{booking.attendees} people</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

