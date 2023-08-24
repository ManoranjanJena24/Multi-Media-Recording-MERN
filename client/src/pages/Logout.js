import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Redirect or update state
    // For example, you can redirect to a login page
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <button className="submit-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
