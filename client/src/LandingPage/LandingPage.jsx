import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

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
          <img src="/app-preview.png" alt="CNNCT App Interface" />
        </div>

        <section className="features">
          <div className="feature-text">
            <h2>Simplified scheduling for you and your team</h2>
            <p>
              CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link,
              and let everyone book time that fits their schedule.
            </p>
          </div>

          <div className="calendar-integration">
            <h2>Stay Organized with Your Calendar & Meetings</h2>
            <ul>
              <li>Track all your upcoming meetings and appointments in one place</li>
              <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts</li>
              <li>Customize event types, time zones, team bookings, group meetings</li>
            </ul>
            <img src="/calendar-preview.png" alt="Calendar Integration" />
          </div>
        </section>

        <section className="testimonials">
          <h2>Here's what our customers have to say</h2>
          <div className="testimonial-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="testimonial-card">
                <p>"Amazing tool! Saved me months of back-and-forth emails."</p>
                <div className="testimonial-author">
                  <img src={`/avatar-${i}.png`} alt="User Avatar" />
                  <span>John Smith, SpaceX</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="integrations">
          <h2>All Link Apps and Integrations</h2>
          <div className="integration-grid">
            {['Zoom', 'Google Meet', 'Microsoft Teams', 'Slack', 'Discord'].map((app) => (
              <div key={app} className="integration-card">
                <img src={`/integration-${app.toLowerCase()}.png`} alt={app} />
                <span>{app}</span>
              </div>
            ))}
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