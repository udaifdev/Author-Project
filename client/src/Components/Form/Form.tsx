// Form.tsx
import React, { useState, useEffect } from 'react';
import './form.css';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookName: '',
    message: ''
  });
  
  // Debug: Log when props change
  useEffect(() => {
    console.log('Form component - isOpen changed to:', isOpen);
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', bookName: '', message: '' });
    onClose();
  };

  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="form-header">
          <h2>Contact Me</h2>
          <p className="subtitle">I love to hear from my readers!</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name*"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="Book Name"
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message"
              rows={5}
              required
            />
          </div>

          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Form;