import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import SignUp from '../signup/Signup';

// Import images from src/assets
import screen1 from '../assets/screen 1.png';
import screen3 from '../assets/screen 3.png';
import fantastical from '../assets/Fantastical 1.png';
import testimonials from '../assets/testimonials.png';
import frame from '../assets/Frame.png';
import secondlast from '../assets/secondlast.png';
import CNNCTlogo from '../assets/CNNCTlogo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">CNNCT</div>
        <button className="sign-in-btn" onClick={() => navigate('/signin')}>
          Sign in
        </button>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1>CNNCT - Easy<br />Scheduling Ahead</h1>
          <button className="sign-up-btn" onClick={() => navigate('/signup')}>
            Sign up free
          </button>
        </div>

        <div className="app-preview">
          <div className="booking-interface">
            <div className="sidebar-preview">
              <div className="logo-preview">CNNCT</div>
              <ul>
                <li>Events</li>
                <li className="active">Booking</li>
                <li>Availability</li>
                <li>Settings</li>
              </ul>
              <div className="user-preview">
                <img src="/default-avatar.png" alt="User" />
                <span>sarthak pal</span>
              </div>
            </div>
            <div className="main-content-preview">
              <h2>Booking</h2>
              <p>See upcoming and past events booked through your event type links.</p>
              
              <div className="tabs">
                <span className="active">Upcoming</span>
                <span>Pending</span>
                <span>Canceled</span>
                <span>past</span>
              </div>
              
              <div className="meetings-list">
                <div className="meeting-item">
                  <div className="meeting-time">
                    <p>Friday, 28 feb</p>
                    <p className="time">2:35 pm - 3:00 pm</p>
                  </div>
                  <div className="meeting-info">
                    <h4>Appointment</h4>
                    <p>You and Dr.kumar</p>
                  </div>
                  <span className="status rejected">Rejected</span>
                </div>
                {/* Add more meeting items as needed */}
              </div>
            </div>
          </div>
        </div>

        <div className="app-preview">
          <img src="/screen 1.png" alt="CNNCT App Interface" />
        </div>

        <section className="features">
          <div className="feature-text">
            <h2>Simplified scheduling for you and your team</h2>
            <p>
              CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link,
              and let everyone book time that fits their schedule.
            </p>
          </div>

          <div className="calendar-preview">
            <div className="calendar-left">
              <h2>Stay Organized with Your Calendar & Meetings</h2>
              <ul>
                <li>Track all your upcoming meetings and appointments in one place</li>
                <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts</li>
                <li>Customize event types, time zones, team bookings, group meetings</li>
              </ul>
            </div>
            <div className="calendar-right">
              <img src="/calendar-day-view.png" alt="Calendar Day View" className="day-view" />
              <img src="/calendar-week-view.png" alt="Calendar Week View" className="week-view" />
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>Here's what our customer has to says</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <h3>Amazing tool! Saved me months</h3>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <img src="/john-master.png" alt="John Master" />
                <div>
                  <h4>John Master</h4>
                  <p>Director, Spark.com</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <h3>Amazing tool! Saved me months</h3>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <img src="/john-master.png" alt="John Master" />
                <div>
                  <h4>John Master</h4>
                  <p>Director, Spark.com</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <h3>Amazing tool! Saved me months</h3>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <img src="/john-master.png" alt="John Master" />
                <div>
                  <h4>John Master</h4>
                  <p>Director, Spark.com</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <h3>Amazing tool! Saved me months</h3>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <img src="/john-master.png" alt="John Master" />
                <div>
                  <h4>John Master</h4>
                  <p>Director, Spark.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="integrations">
          <h2>All Link Apps and Integrations</h2>
          <div className="integration-grid">
            <div className="integration-card">
              <img src="/zoom-icon.png" alt="Zoom" />
              <h3>Zoom</h3>
              <p>Schedule your next video chat</p>
            </div>
            <div className="integration-card">
              <img src="/meet-icon.png" alt="Google Meet" />
              <h3>Google Meet</h3>
              <p>Connect with your team seamlessly</p>
            </div>
            <div className="integration-card">
              <img src="/teams-icon.png" alt="Microsoft Teams" />
              <h3>Microsoft Teams</h3>
              <p>Collaborate with your colleagues</p>
            </div>
            <div className="integration-card">
              <img src="/slack-icon.png" alt="Slack" />
              <h3>Slack</h3>
              <p>Stay connected with your team</p>
            </div>
            <div className="integration-card">
              <img src="/discord-icon.png" alt="Discord" />
              <h3>Discord</h3>
              <p>Connect with your community</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="social-links">
            <img src="/twitter-icon.svg" alt="Twitter" />
            <img src="/instagram-icon.svg" alt="Instagram" />
            <img src="/linkedin-icon.svg" alt="LinkedIn" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;