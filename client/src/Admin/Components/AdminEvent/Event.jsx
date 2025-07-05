import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './event.css';
import AdminHeader from '../AdminHeader/AdminHeader';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: ''
  });

  // Fetch events from Supabase on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events from Supabase
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        alert('Error fetching events: ' + error.message);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file) => {
    if (!file) return null;

    try {
      setUploading(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `public/${fileName}`; // Fixed: Remove duplicate path

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      let imageUrl = null;
      
      // Upload image if provided
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      // Insert event into Supabase
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            title: formData.title.trim(),
            description: formData.description.trim(),
            image_url: imageUrl
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Update local state
      if (data && data.length > 0) {
        setEvents(prev => [data[0], ...prev]);
      }

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        image: null,
        imagePreview: ''
      });
      setIsModalOpen(false);
      
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: ''
    });
  };

  // Delete event from Supabase
  const deleteEvent = async (id, imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    try {
      setLoading(true);

      // Delete from database
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Delete image from storage if it exists
      if (imageUrl) {
        try {
          // Extract the full path from the URL
          // URL format: https://your-project.supabase.co/storage/v1/object/public/event-images/public/filename.jpg
          const urlParts = imageUrl.split('/');
          const bucketIndex = urlParts.findIndex(part => part === 'event-images');
          
          if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
            // Get everything after 'event-images' in the URL
            const filePath = urlParts.slice(bucketIndex + 1).join('/');
            console.log('Attempting to delete file at path:', filePath);
            
            const { error: deleteError } = await supabase.storage
              .from('event-images')
              .remove([filePath]);
              
            if (deleteError) {
              console.warn('Error deleting image from storage:', deleteError);
            } else {
              console.log('Image deleted successfully from storage');
            }
          } else {
            console.warn('Could not extract file path from URL:', imageUrl);
          }
        } catch (imageError) {
          console.warn('Error deleting image:', imageError);
          // Don't throw here as the main deletion was successful
        }
      }

      // Update local state
      setEvents(prev => prev.filter(event => event.id !== id));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
    <AdminHeader/>
    <div className="event-container">
      <div className="event-header">
        <h1>Events Management</h1>
        <button 
          className="add-event-btn"
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
        >
          + Add Event
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-indicator">
          <p>Loading...</p>
        </div>
      )}

      {/* No Events Alert */}
      {!loading && events.length === 0 && (
        <div className="no-events-alert">
          <div className="alert-content">
            <span className="alert-icon">⚠️</span>
            <p>No events available. Click "Add Event" to create your first event.</p>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            {event.image_url && (
              <div className="event-image">
                <img 
                  src={event.image_url} 
                  alt={event.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-footer">
                <span className="event-date">
                  {formatDate(event.created_at)}
                </span>
                <button 
                  className="delete-btn"
                  onClick={() => deleteEvent(event.id, event.image_url)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Event</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-group">
                <label htmlFor="title">Event Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Event Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Event Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                  disabled={loading}
                />
                {formData.imagePreview && (
                  <div className="image-preview">
                    <img src={formData.imagePreview} alt="Preview" />
                  </div>
                )}
                {uploading && (
                  <p className="upload-status">Uploading image...</p>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading || uploading || !formData.title.trim() || !formData.description.trim()}
                >
                  {loading ? 'Adding...' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Event;