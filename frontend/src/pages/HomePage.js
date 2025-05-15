import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold">Welcome to Apartment Management System</h1>
          <p className="lead">
            A comprehensive solution for apartment owners, residents, and visitors.
          </p>
          <p>
            Our platform offers a seamless experience for managing apartments, handling complaints, 
            processing payments, and much more.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link to="/apartments" className="btn btn-primary btn-lg px-4 me-md-2">
              View Apartments
            </Link>
            <Link to="/register" className="btn btn-outline-primary btn-lg px-4">
              Register
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <img 
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
            className="img-fluid rounded-3 shadow-lg" 
            alt="Modern apartment building"
          />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold">Our Services</h2>
          <p className="lead">Discover what we offer</p>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="bi bi-building fs-1 text-primary"></i>
              </div>
              <h3 className="card-title">Apartment Management</h3>
              <p className="card-text">
                Browse available apartments, view details, and request bookings with ease.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="bi bi-clipboard-check fs-1 text-primary"></i>
              </div>
              <h3 className="card-title">Complaint Resolution</h3>
              <p className="card-text">
                Raise complaints, track status, and get timely resolutions for maintenance issues.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="bi bi-credit-card fs-1 text-primary"></i>
              </div>
              <h3 className="card-title">Rent Payments</h3>
              <p className="card-text">
                Pay rent online, view payment history, and manage recurring payments.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5 bg-light py-5 rounded-3">
        <div className="col-12 text-center mb-4">
          <h2 className="fw-bold">User Roles</h2>
          <p className="lead">Different features for different users</p>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-primary">
            <div className="card-header bg-primary text-white">Apartment Admin</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Manage apartment listings</li>
                <li className="list-group-item">Handle resident complaints</li>
                <li className="list-group-item">Process rental applications</li>
                <li className="list-group-item">Generate reports</li>
                <li className="list-group-item">Monitor payments</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-success">
            <div className="card-header bg-success text-white">Resident</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">View apartment details</li>
                <li className="list-group-item">Raise maintenance complaints</li>
                <li className="list-group-item">Pay rent online</li>
                <li className="list-group-item">Track payment history</li>
                <li className="list-group-item">View announcements</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-info">
            <div className="card-header bg-info text-white">Visitor</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Browse available apartments</li>
                <li className="list-group-item">View apartment details</li>
                <li className="list-group-item">Request apartment booking</li>
                <li className="list-group-item">Contact management</li>
                <li className="list-group-item">Register as a resident</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 