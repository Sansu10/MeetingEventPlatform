import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Availability.css';
import CalendarView from '../CalenderView/CalenderView';

const Availability = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = useState('availability'); // 'availability' or 'calendar'
  const [weeklyHours, setWeeklyHours] = useState({
    Sun: { available: false, slots: [] },
    Mon: { available: true, slots: [{ start: '', end: '' }] },
    Tue: { available: true, slots: [{ start: '', end: '' }] },
    Wed: { available: true, slots: [{ start: '', end: '' }] },
    Thu: { available: true, slots: [{ start: '', end: '' }] },
    Fri: { available: true, slots: [{ start: '', end: '' }] },
    Sat: { available: true, slots: [{ start: '', end: '' }] }
  });

  const addTimeSlot = (day) => {
    setWeeklyHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: '', end: '' }]
      }
    }));
  };

  const removeTimeSlot = (day, index) => {
    setWeeklyHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index)
      }
    }));
  };

  const handleTimeChange = (day, index, field, value) => {
    setWeeklyHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
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
            <li onClick={() => navigate('/booking')}>Booking</li>
            <li className="active">Availability</li>
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
            <h1>Availability</h1>
            <p>Configure times when you are available for bookings</p>
          </div>
        </div>

        <div className="view-toggle">
          <button 
            className={`toggle-button ${view === 'availability' ? 'active' : ''}`}
            onClick={() => setView('availability')}
          >
            Availability
          </button>
          <button 
            className={`toggle-button ${view === 'calendar' ? 'active' : ''}`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
        </div>

        {view === 'availability' ? (
          <div className="availability-container">
            <div className="schedule-container">
              <div className="schedule-header">
                <div className="activity">
                  <span>Event type</span>
                  <span className="arrow">›</span>
                </div>
                <div className="timezone">
                  <span>Indian Time Standard</span>
                  <span className="arrow">›</span>
                </div>
              </div>

              <div className="weekly-hours">
                <h3>Weekly hours</h3>
                {Object.entries(weeklyHours).map(([day, { available, slots }]) => (
                  <div key={day} className="day-row">
                    <div className="day-checkbox">
                      <input
                        type="checkbox"
                        checked={available}
                        onChange={() => day !== 'Sun' && setWeeklyHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day], available: !prev[day].available }
                        }))}
                        disabled={day === 'Sun'}
                      />
                      <span>{day}</span>
                    </div>
                    
                    {available ? (
                      <div className="time-slots">
                        {slots.map((slot, index) => (
                          <div key={index} className="time-slot">
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                            />
                            <span>-</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                            />
                            <button onClick={() => removeTimeSlot(day, index)}>×</button>
                          </div>
                        ))}
                        <button onClick={() => addTimeSlot(day)} className="add-time">+</button>
                      </div>
                    ) : (
                      <span className="unavailable">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <CalendarView />
        )}
      </div>
    </div>
  );
};

export default Availability;