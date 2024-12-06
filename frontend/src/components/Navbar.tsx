import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('token');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/'); // Redirect to login page
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <div>
        <h1 style={{ cursor: 'pointer', color: '#007BFF' }} 
          onClick={() => navigate('/')}>TODO APPLICATION</h1>
      </div>
      <div> 
        {isLoggedIn && (
            <button onClick={handleLogout}>Logout</button>
        )}
      </div>
        {/* Add other nav items if necessary */}
    </nav>
  );
};

export default Navbar;
