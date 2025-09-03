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
           
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61578183835719&mibextid=ZbWKwL" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/arjunmaurya_author?igsh=am1oYmg1NnZucWlr" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com/@jegamedia?si=4NF1GmJrdgPKYg_f" className="social-icon">
              <Youtube size={20} />
            </a>
            <a href="https://www.linkedin.com/in/arjun-maurya-725b1b327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-icon">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="contact-details">
          {/* <div className="contact-column">
            <h3>For Media & Press Inquiries</h3>
            <div className="contact-info">
              <p>a.media@email.com</p>
              <p>+1 (234) 567 89 00</p>
            </div>
          </div> */}

          <div className="contact-column">
            <h3>My Personal Contacts</h3>
            <div className="contact-info">
              <p>arjunmauryaauthor@gmail.com</p>
              <p>(+91) 94486 00644</p>
            </div>
          </div>

          {/* <div className="contact-column">
            <h3>Agent Requests</h3>
            <div className="contact-info">
              <p>edubuilt@gmail.com</p>
              <p>(+91) 94486 00644</p>
            </div>
          </div> */}
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