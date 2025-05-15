import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import ApartmentCard from '../components/ApartmentCard';
import { deleteApartment, getApartments } from '../services/api';

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [filters, setFilters] = useState({
    isAvailable: '',
    minBedrooms: '',
    maxRent: '',
    floorNumber: ''
  });

  useEffect(() => {
    // Check if user is admin
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setIsAdmin(decoded.role === 'ADMIN');
      } catch (error) {
        console.error('Invalid token', error);
      }
    }

    fetchApartments();
  }, []);

  const fetchApartments = async (filterParams = {}) => {
    setLoading(true);
    try {
      const data = await getApartments(filterParams);
      setApartments(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch apartments. Please try again later.');
      console.error('Error fetching apartments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (apartmentId) => {
    if (window.confirm('Are you sure you want to delete this apartment?')) {
      try {
        await deleteApartment(apartmentId);
        setApartments(apartments.filter(apt => apt.id !== apartmentId));
      } catch (error) {
        setError('Failed to delete apartment. Please try again.');
        console.error('Error deleting apartment:', error);
      }
    }
  };

  const handleEdit = (apartment) => {
    // This would navigate to edit page or open a modal
    console.log('Edit apartment:', apartment);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    const filterParams = {};
    
    if (filters.isAvailable !== '') {
      filterParams.isAvailable = filters.isAvailable === 'true';
    }
    
    if (filters.minBedrooms) {
      filterParams.minBedrooms = parseInt(filters.minBedrooms);
    }
    
    if (filters.maxRent) {
      filterParams.maxRent = parseInt(filters.maxRent);
    }
    
    if (filters.floorNumber) {
      filterParams.floorNumber = parseInt(filters.floorNumber);
    }
    
    fetchApartments(filterParams);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="mb-4">Available Apartments</h1>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Filter Apartments</h5>
              <form onSubmit={applyFilters}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label htmlFor="isAvailable" className="form-label">Availability</label>
                    <select 
                      className="form-select" 
                      id="isAvailable" 
                      name="isAvailable"
                      value={filters.isAvailable}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3">
                    <label htmlFor="minBedrooms" className="form-label">Min Bedrooms</label>
                    <select 
                      className="form-select" 
                      id="minBedrooms" 
                      name="minBedrooms"
                      value={filters.minBedrooms}
                      onChange={handleFilterChange}
                    >
                      <option value="">Any</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  
                  <div className="col-md-3">
                    <label htmlFor="maxRent" className="form-label">Max Rent ($)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="maxRent" 
                      name="maxRent"
                      placeholder="Any"
                      value={filters.maxRent}
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="col-md-3">
                    <label htmlFor="floorNumber" className="form-label">Floor</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="floorNumber" 
                      name="floorNumber"
                      placeholder="Any"
                      value={filters.floorNumber}
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">Apply Filters</button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary ms-2"
                      onClick={() => {
                        setFilters({
                          isAvailable: '',
                          minBedrooms: '',
                          maxRent: '',
                          floorNumber: ''
                        });
                        fetchApartments();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {isAdmin && (
        <div className="row mb-4">
          <div className="col">
            <button className="btn btn-success mb-3">
              Add New Apartment
            </button>
          </div>
        </div>
      )}
      
      <div className="row">
        {loading ? (
          <div className="col text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading apartments...</p>
          </div>
        ) : apartments.length > 0 ? (
          apartments.map(apartment => (
            <ApartmentCard 
              key={apartment.id} 
              apartment={apartment} 
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className="col">
            <div className="alert alert-info" role="alert">
              No apartments found matching your criteria.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentList; 