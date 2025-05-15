import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Apartment Management System</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/apartments">Apartments</Link>
            </li>
            
            {isAuthenticated && userRole === 'ADMIN' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/complaints">Complaints</Link>
                </li>
              </>
            )}
            
            {isAuthenticated && userRole === 'RESIDENT' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/resident">Resident Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/complaints">My Complaints</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/payments">Payments</Link>
                </li>
              </>
            )}
            
            {isAuthenticated && userRole === 'VISITOR' && (
              <li className="nav-item">
                <Link className="nav-link" to="/visitor">Visitor Dashboard</Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 