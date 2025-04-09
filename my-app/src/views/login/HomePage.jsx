import React from 'react';

const Homepage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      {/* Header Section */}
      <header style={{ backgroundColor: '#007BFF', color: '#fff', padding: '20px' }}>
        <h1>Welcome to My Website</h1>
        <p>Your one-stop destination for awesome content!</p>
      </header>

      {/* Navigation Section */}
      <nav style={{ margin: '20px 0' }}>
        <a href="#home" style={linkStyle}>Home</a>
        <a href="#about" style={linkStyle}>About</a>
        <a href="#services" style={linkStyle}>Services</a>
        <a href="#contact" style={linkStyle}>Contact</a>
      </nav>

      {/* Main Content */}
      <main>
        <h2>About Us</h2>
        <p>Welcome to our website! We are passionate about delivering great experiences.</p>

        <h2>Our Services</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>✔ Service 1</li>
          <li>✔ Service 2</li>
          <li>✔ Service 3</li>
        </ul>

        <h2>Contact Us</h2>
        <p>Email us at info@example.com or fill out the contact form below.</p>
      </main>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', marginTop: '20px' }}>
        &copy; 2025 My Website. All Rights Reserved.
      </footer>
    </div>
  );
};

// Inline styles for navigation links
const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  margin: '0 15px',
};

export default Homepage;
