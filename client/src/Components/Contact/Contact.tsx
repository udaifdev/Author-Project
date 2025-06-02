import React, { useState } from 'react';
import './ContactSection.css';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openContactForm = () => {
    setIsFormOpen(true);
  };  
 
  const closeContactForm = () => {
    setIsFormOpen(false);
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-heading">
          <p className="contact-subtitle">Contacts</p>
          <h2 className="contact-title">I Love to Chat With My Readers!</h2>
          <p className="contact-description">
            If you want share your opinion on my books or simply say hi, feel free contact me in any convenient way.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <Youtube size={20} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="contact-details">
          <div className="contact-column">
            <h3>For Media & Press Inquiries</h3>
            <div className="contact-info">
              <p>a.media@email.com</p>
              <p>+1 (234) 567 89 00</p>
            </div>
          </div>

          <div className="contact-column">
            <h3>My Personal Contacts</h3>
            <div className="contact-info">
              <p>antoine@email.com</p>
              <p>+1 (234) 567 89 02</p>
            </div>
          </div>

          <div className="contact-column">
            <h3>For Rights & Agent Requests</h3>
            <div className="contact-info">
              <p>request@email.com</p>
              <p>+1 (234) 567 89 01</p>
            </div>
          </div>
{/* 
          <div className="contact-column">
            <h3>Want to Leave a Request?</h3>
            <div className="contact-info">
              <p>Fill out the contact form</p>
              <button className="contact-button"  >
                Contact Me →
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;