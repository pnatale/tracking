import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home/home.js';
import About from './About/about.js';
import Contact from './Contact/contact.js';
import Tracking from './Tracking/tracking.js';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Tracking" element={<Tracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
