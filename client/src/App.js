import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./signup/Signup";
import SignIn from "./Signin page/SignIn";
import Preferences from "./Preferences/Preferences";
import { AuthProvider } from "./context/AuthContext";
import Events from "./Events/Events";
import Settings from "./Settings/Settings";
import CreateEvent from "./create/CreateEvent";
import Booking from "./Booking/Booking";  
import Availability from "./Availabilty/Availability";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/preferences" element={<Preferences />} />
            
            {/* Protected Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/availability" element={<Availability />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
