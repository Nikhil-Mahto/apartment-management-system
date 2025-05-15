import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComplaint } from '../services/api';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'MAINTENANCE',
    priority: 'MEDIUM'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await createComplaint(formData);
      setSuccess('Complaint submitted successfully!');
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        category: 'MAINTENANCE',
        priority: 'MEDIUM'
      });
      
      // Redirect to complaints list after a delay
      setTimeout(() => {
        navigate('/complaints');
      }, 2000);
      
    } catch (error) {
      setError(error.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">Submit a Complaint</h4>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief title of the issue"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="PLUMBING">Plumbing</option>
                    <option value="ELECTRICAL">Electrical</option>
                    <option value="HVAC">HVAC/Air Conditioning</option>
                    <option value="APPLIANCE">Appliance</option>
                    <option value="NOISE">Noise Complaint</option>
                    <option value="SECURITY">Security</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">Priority *</label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="LOW">Low - Not urgent</option>
                    <option value="MEDIUM">Medium - Needs attention soon</option>
                    <option value="HIGH">High - Urgent issue</option>
                    <option value="CRITICAL">Critical - Emergency</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Please provide detailed description of the issue. Include when it started, what you've observed, and any other relevant details."
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Upload Image (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                  />
                  <div className="form-text">Supported formats: JPG, PNG, GIF. Max size: 5MB</div>
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-warning"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/complaints')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              
              <div className="mt-4">
                <h5>What happens next?</h5>
                <ol className="list-group list-group-numbered mt-2">
                  <li className="list-group-item">Your complaint will be reviewed by management</li>
                  <li className="list-group-item">You'll receive a confirmation email</li>
                  <li className="list-group-item">A staff member will be assigned to your case</li>
                  <li className="list-group-item">You can track status on the complaints page</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm; 