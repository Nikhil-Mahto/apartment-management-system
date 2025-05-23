import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalApartments: 0,
    availableApartments: 0,
    totalResidents: 0,
    pendingComplaints: 0,
    totalRevenue: 0,
    recentComplaints: [],
    upcomingPayments: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await getAdminStats();
      setStats(data);
      setError('');
    } catch (error) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching admin stats:', error);
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
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card bg-primary text-white">
            <div className="card-body">
              <h5>Total Apartments</h5>
              <h2>{stats.totalApartments}</h2>
              <Link to="/apartments" className="text-white">View All</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card bg-success text-white">
            <div className="card-body">
              <h5>Available Apartments</h5>
              <h2>{stats.availableApartments}</h2>
              <Link to="/apartments" className="text-white">View Available</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card bg-warning text-dark">
            <div className="card-body">
              <h5>Total Residents</h5>
              <h2>{stats.totalResidents}</h2>
              <Link to="/residents" className="text-dark">Manage Residents</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card bg-danger text-white">
            <div className="card-body">
              <h5>Pending Complaints</h5>
              <h2>{stats.pendingComplaints}</h2>
              <Link to="/complaints" className="text-white">View Complaints</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue Card */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Revenue Overview</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center border-end">
                  <h6>Total Revenue</h6>
                  <h3>${stats.totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="col-md-4 text-center border-end">
                  <h6>This Month</h6>
                  <h3>${(stats.totalRevenue * 0.1).toLocaleString()}</h3>
                </div>
                <div className="col-md-4 text-center">
                  <h6>Upcoming Payments</h6>
                  <h3>${(stats.totalRevenue * 0.08).toLocaleString()}</h3>
                </div>
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
                <div className="col-md-3 mb-3">
                  <Link to="/apartments/new" className="btn btn-outline-primary w-100 p-3">
                    Add Apartment
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/announcements/new" className="btn btn-outline-info w-100 p-3">
                    Make Announcement
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/reports" className="btn btn-outline-success w-100 p-3">
                    Generate Reports
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/settings" className="btn btn-outline-secondary w-100 p-3">
                    System Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
