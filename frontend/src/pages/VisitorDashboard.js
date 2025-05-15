import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApartments, getUserProfile } from '../services/api';

const VisitorDashboard = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const profileData = await getUserProfile();
      setProfile(profileData);
      
      const apartmentsData = await getApartments({ isAvailable: true, limit: 3 });
      setApartments(apartmentsData);
      
      setError('');
    } catch (error) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching visitor data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-outline-danger ms-3"
            onClick={fetchDashboardData}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Visitor Dashboard</h1>
      
      {/* Welcome Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome, {profile.firstName} {profile.lastName}!</h5>
              <p className="card-text">
                As a visitor, you can browse available apartments and request bookings. When you find an apartment you like, you can apply to become a resident.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Apartments */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Featured Apartments</h5>
              <Link to="/apartments" className="btn btn-sm btn-outline-light">View All</Link>
            </div>
            <div className="card-body">
              <div className="row">
                {apartments.length > 0 ? (
                  apartments.map(apartment => (
                    <div key={apartment.id} className="col-md-4 mb-3">
                      <div className="card h-100">
                        <img 
                          src={apartment.imageUrl || 'https://via.placeholder.com/300x200?text=Apartment'} 
                          className="card-img-top" 
                          alt={apartment.name}
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{apartment.name}</h5>
                          <p className="card-text">
                            <strong>Floor/Unit:</strong> {apartment.floorNumber}/{apartment.unitNumber}<br />
                            <strong>Bedrooms:</strong> {apartment.bedrooms}<br />
                            <strong>Rent:</strong> ${apartment.rent}/month
                          </p>
                          <Link to={`/apartments/${apartment.id}`} className="btn btn-primary w-100">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-center">No available apartments at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link to="/apartments" className="btn btn-outline-primary w-100 p-3">
                    Browse Apartments
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link to="/bookings" className="btn btn-outline-info w-100 p-3">
                    My Booking Requests
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link to="/profile" className="btn btn-outline-secondary w-100 p-3">
                    Update Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Information Cards */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">How to Book an Apartment</h5>
            </div>
            <div className="card-body">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">Browse available apartments</li>
                <li className="list-group-item">Select an apartment you're interested in</li>
                <li className="list-group-item">Fill out the booking request form</li>
                <li className="list-group-item">Wait for approval from management</li>
                <li className="list-group-item">Once approved, complete the application process</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Resident Benefits</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">24/7 maintenance support</li>
                <li className="list-group-item">Access to community amenities</li>
                <li className="list-group-item">Online rent payment system</li>
                <li className="list-group-item">Regular community events</li>
                <li className="list-group-item">Secure building with controlled access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorDashboard; 