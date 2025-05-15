import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ComplaintForm from './components/ComplaintForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './pages/AdminDashboard';
import ApartmentList from './pages/ApartmentList';
import ComplaintList from './pages/ComplaintList';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import ResidentDashboard from './pages/ResidentDashboard';
import VisitorDashboard from './pages/VisitorDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setIsAuthenticated(true);
        setUserRole(decoded.role);
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole('');
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm onLoginSuccess={(role) => { setIsAuthenticated(true); setUserRole(role); }} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/apartments" element={<ApartmentList />} />
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/resident" element={
              <ProtectedRoute allowedRoles={['RESIDENT']}>
                <ResidentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/visitor" element={
              <ProtectedRoute allowedRoles={['VISITOR']}>
                <VisitorDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/complaints/new" element={
              <ProtectedRoute allowedRoles={['RESIDENT']}>
                <ComplaintForm />
              </ProtectedRoute>
            } />
            
            <Route path="/complaints" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'RESIDENT']}>
                <ComplaintList />
              </ProtectedRoute>
            } />
            
            <Route path="/payments" element={
              <ProtectedRoute allowedRoles={['RESIDENT']}>
                <PaymentPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 