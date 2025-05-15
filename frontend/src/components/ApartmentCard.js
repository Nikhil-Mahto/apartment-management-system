import React from 'react';
import { Link } from 'react-router-dom';

const ApartmentCard = ({ apartment, isAdmin, onDelete, onEdit }) => {
  const {
    id,
    name,
    floorNumber,
    unitNumber,
    area,
    bedrooms,
    bathrooms,
    rent,
    isAvailable,
    imageUrl
  } = apartment;

  const defaultImage = 'https://via.placeholder.com/300x200?text=Apartment';

  return (
    <div className="col-md-4 mb-4">
      <div className="card apartment-card h-100">
        <img 
          src={imageUrl || defaultImage} 
          className="card-img-top" 
          alt={name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <div className="card-text mb-2">
            <p className="mb-1">
              Floor: {floorNumber}, Unit: {unitNumber}
            </p>
            <p className="mb-1">
              <strong>Size:</strong> {area} sq ft
            </p>
            <p className="mb-1">
              <strong>Beds/Baths:</strong> {bedrooms} / {bathrooms}
            </p>
            <p className="mb-1">
              <strong>Monthly Rent:</strong> ${rent}
            </p>
            <div className="mt-2">
              <span className={`badge ${isAvailable ? 'bg-success' : 'bg-danger'}`}>
                {isAvailable ? 'Available' : 'Not Available'}
              </span>
            </div>
          </div>
          
          <div className="mt-auto">
            {isAdmin ? (
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-warning flex-grow-1"
                  onClick={() => onEdit(apartment)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger flex-grow-1"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <Link 
                to={`/apartments/${id}`} 
                className="btn btn-primary w-100"
              >
                {isAvailable ? 'View Details' : 'View Details'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard; 