import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getComplaints, getPaymentHistory, getUserProfile } from '../services/api';

const ResidentDashboard = () => {
  const [profile, setProfile] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    apartment: {
      id: 0,
      name: '',
      unitNumber: '',
      rent: 0
    }
  });
  
  const [complaints, setComplaints] = useState([]);
  const [payments, setPayments] = useState([]);
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
      
      const complaintsData = await getComplaints();
      setComplaints(complaintsData);
      
      const paymentsData = await getPaymentHistory();
      setPayments(paymentsData);
      
      setError('');
    } catch (error) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching resident data:', error);
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

  // Calculate next payment date (just for demo)
  const today = new Date();
  const nextPaymentDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Resident Dashboard</h1>
      
      {/* Welcome Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome, {profile.firstName} {profile.lastName}!</h5>
              <p className="card-text">
                You are a resident of <strong>{profile.apartment.name}</strong>, Unit <strong>{profile.apartment.unitNumber}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card dashboard-card bg-primary text-white">
            <div className="card-body">
              <h5>Monthly Rent</h5>
              <h2>${profile.apartment.rent}</h2>
              <p>Due on {nextPaymentDate.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card dashboard-card bg-success text-white">
            <div className="card-body">
              <h5>Payments Made</h5>
              <h2>{payments.length}</h2>
              <Link to="/payments" className="text-white">View History</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card dashboard-card bg-warning text-dark">
            <div className="card-body">
              <h5>Active Complaints</h5>
              <h2>{complaints.filter(c => c.status !== 'RESOLVED').length}</h2>
              <Link to="/complaints" className="text-dark">View Complaints</Link>
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
                <div className="col-md-3 mb-3">
                  <Link to="/payments/new" className="btn btn-outline-primary w-100 p-3">
                    Pay Rent
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/complaints/new" className="btn btn-outline-warning w-100 p-3">
                    Report Issue
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/profile" className="btn btn-outline-info w-100 p-3">
                    Update Profile
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/contact" className="btn btn-outline-secondary w-100 p-3">
                    Contact Management
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Complaints */}
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Complaints</h5>
              <Link to="/complaints" className="btn btn-sm btn-outline-dark">View All</Link>
            </div>
            <div className="card-body">
              {complaints.length > 0 ? (
                <div className="list-group">
                  {complaints.slice(0, 3).map(complaint => (
                    <div key={complaint.id} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{complaint.title}</h6>
                        <small>
                          <span className={`badge ${
                            complaint.status === 'PENDING' ? 'bg-warning' :
                            complaint.status === 'IN_PROGRESS' ? 'bg-info' :
                            complaint.status === 'RESOLVED' ? 'bg-success' : 'bg-secondary'
                          }`}>
                            {complaint.status.replace('_', ' ')}
                          </span>
                        </small>
                      </div>
                      <p className="mb-1 text-truncate">{complaint.description}</p>
                      <small>Reported on: {new Date(complaint.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center mt-3">No complaints filed yet</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Recent Payments */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Payments</h5>
              <Link to="/payments" className="btn btn-sm btn-outline-light">View All</Link>
            </div>
            <div className="card-body">
              {payments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.slice(0, 5).map(payment => (
                        <tr key={payment.id}>
                          <td>{new Date(payment.date).toLocaleDateString()}</td>
                          <td>{payment.description}</td>
                          <td className="text-end">${payment.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center mt-3">No payment history available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard; 